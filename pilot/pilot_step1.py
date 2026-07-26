import cv2
import json
import time
import os
from collections import deque
from datetime import datetime, timedelta
from shapely.geometry import Polygon, box
from ultralytics import YOLO
import supervision as sv

import config
import mock_bookings

class SlotifyPilotPipeline:
    def __init__(self):
        print(f"[INIT] Loading YOLO Model: {config.YOLO_MODEL_PATH}")
        self.model = YOLO(config.YOLO_MODEL_PATH)
        
        # Supervision ByteTrack Tracker (used ONLY during active burst windows)
        self.tracker = sv.ByteTrack()
        
        self.slots = self._load_slots()
        
        # State tracking per slot
        self.persistence_buffers = {s["slot_id"]: deque(maxlen=config.PERSISTENCE_BUFFER_SIZE) for s in self.slots}
        self.confirmed_vision_state = {s["slot_id"]: False for s in self.slots}
        self.burst_mode_active = {s["slot_id"]: False for s in self.slots}
        self.burst_end_time = {s["slot_id"]: 0 for s in self.slots}
        
        # Reconciliation state
        self.grace_timers = {} # slot_id -> datetime when grace period started

    def _load_slots(self):
        if not os.path.exists(config.SLOTS_CONFIG_FILE):
            raise FileNotFoundError(f"Missing {config.SLOTS_CONFIG_FILE}. Run 'python roi_drawer.py' first!")
        
        with open(config.SLOTS_CONFIG_FILE, "r") as f:
            data = json.load(f)
            
        slots_parsed = []
        for item in data:
            poly = Polygon(item["points"])
            slots_parsed.append({
                "slot_id": item["slot_id"],
                "polygon": poly,
                "points": item["points"],
                "area": poly.area
            })
        print(f"[INIT] Loaded {len(slots_parsed)} slot ROIs from {config.SLOTS_CONFIG_FILE}")
        return slots_parsed

    def _get_raw_occupancy(self, detections):
        """
        Calculates overlap between detected vehicle boxes and slot polygons.
        Ensures a single vehicle only occupies the slot with which it shares the highest overlap ratio.
        """
        slot_raw_occupied = {s["slot_id"]: False for s in self.slots}
        slot_highest_overlap = {s["slot_id"]: 0.0 for s in self.slots}

        if len(detections) == 0:
            return slot_raw_occupied

        for xyxy, confidence, class_id, tracker_id in detections:
            if class_id not in config.VEHICLE_CLASS_IDS or confidence < config.CONFIDENCE_THRESHOLD:
                continue
            
            car_poly = box(xyxy[0], xyxy[1], xyxy[2], xyxy[3])
            
            best_slot_id = None
            best_overlap_ratio = 0.0
            
            for slot in self.slots:
                if not car_poly.intersects(slot["polygon"]):
                    continue
                
                intersection_area = car_poly.intersection(slot["polygon"]).area
                overlap_ratio = intersection_area / slot["area"]
                
                if overlap_ratio >= config.SLOT_OVERLAP_THRESHOLD:
                    if overlap_ratio > best_overlap_ratio:
                        best_overlap_ratio = overlap_ratio
                        best_slot_id = slot["slot_id"]
            
            # Assign vehicle to the highest-overlapping slot
            if best_slot_id and best_overlap_ratio > slot_highest_overlap[best_slot_id]:
                slot_highest_overlap[best_slot_id] = best_overlap_ratio
                slot_raw_occupied[best_slot_id] = True

        return slot_raw_occupied

    def _update_anti_flicker_states(self, slot_raw_occupied, current_time_sec, detections):
        """
        Manages Persistence Buffer (Baseline) and ByteTrack Triggering (Burst Window).
        """
        states_changed = {}

        for slot in self.slots:
            sid = slot["slot_id"]
            raw_reading = slot_raw_occupied[sid]
            
            # Update persistence buffer
            self.persistence_buffers[sid].append(raw_reading)
            
            # 1. PRIMARY MECHANISM: Persistence Buffer Verification
            buffer_full = len(self.persistence_buffers[sid]) == config.PERSISTENCE_BUFFER_SIZE
            all_identical = len(set(self.persistence_buffers[sid])) == 1
            
            if buffer_full and all_identical:
                candidate_state = self.persistence_buffers[sid][0]
                
                # State change detected!
                if candidate_state != self.confirmed_vision_state[sid]:
                    self.confirmed_vision_state[sid] = candidate_state
                    states_changed[sid] = "PERSISTENCE_BUFFER"
                    
                    # Trigger Burst Mode for this slot
                    self.burst_mode_active[sid] = True
                    self.burst_end_time[sid] = current_time_sec + config.BURST_DURATION_SEC

            # 2. SECONDARY MECHANISM: ByteTrack Validation during Burst Window
            if self.burst_mode_active[sid]:
                if current_time_sec > self.burst_end_time[sid]:
                    self.burst_mode_active[sid] = False
                else:
                    # Run ByteTrack tracking association during burst window
                    if len(detections) > 0:
                        tracked_detections = self.tracker.update_with_detections(detections)
                        # ByteTrack actively maintains tracking identity across consecutive frames
                        if sid not in states_changed and len(tracked_detections) > 0:
                            states_changed[sid] = "BURST_BYTETRACK_ACTIVE"

        return states_changed

    def reconcile_slot_state(self, slot_id: str, vision_occupied: bool, booking: dict | None) -> dict:
        """
        Executes the 4-case state reconciliation machine.
        """
        now = datetime.now()

        # CASE 2: Unpaid Occupancy
        if vision_occupied and booking is None:
            return {"action": "UNPAID_OCCUPANCY_ALERT", "status": "UNPAID", "color": (0, 255, 255)}

        # CASE 3: Overstay
        if vision_occupied and booking is not None and now > booking["end_time"]:
            if slot_id not in self.grace_timers:
                self.grace_timers[slot_id] = now
                return {"action": "GRACE_PERIOD_STARTED", "status": "OVERSTAY_GRACE", "color": (0, 255, 255)}
            
            grace_expiry = self.grace_timers[slot_id] + timedelta(minutes=config.OVERSTAY_GRACE_MINUTES)
            if now > grace_expiry:
                return {"action": "PENDING_SURCHARGE", "status": "OVERSTAY_PENALTY", "color": (0, 0, 255)}
            else:
                return {"action": "GRACE_PERIOD_ACTIVE", "status": "OVERSTAY_GRACE", "color": (0, 255, 255)}

        # Clear grace timer if vehicle leaves or scenario resets
        if not vision_occupied and slot_id in self.grace_timers:
            del self.grace_timers[slot_id]

        # CASE 4: No-Show
        if not vision_occupied and booking is not None and booking.get("status") == "UPCOMING":
            no_show_time = booking["start_time"] + timedelta(minutes=config.NO_SHOW_THRESHOLD_MINUTES)
            if now > no_show_time:
                return {"action": "AUTO_RELEASE_SLOT", "status": "AVAILABLE", "color": (0, 255, 0)}

        # CASE 1: Normal / Synchronized State
        expected_status = "OCCUPIED" if vision_occupied else "AVAILABLE"
        color = (0, 0, 255) if vision_occupied else (0, 255, 0)
        return {"action": "SYNC", "status": expected_status, "color": color}

    def _annotate_and_save(self, frame, reconciliation_results, trigger_reasons):
        """
        Annotates frame with slot status and saves snapshot to /logs.
        """
        annotated = frame.copy()
        
        for slot in self.slots:
            sid = slot["slot_id"]
            res = reconciliation_results[sid]
            pts = slot["points"]
            
            # Draw Slot Polygon
            for i in range(len(pts)):
                p1 = tuple(pts[i])
                p2 = tuple(pts[(i + 1) % len(pts)])
                cv2.line(annotated, p1, p2, res["color"], 2)
            
            # Text Annotation
            label = f"{sid}: {res['status']}"
            cv2.putText(annotated, label, tuple(pts[0]), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

        timestamp_str = datetime.now().strftime("%Y%m%d_%H%M%S")
        for sid, reason in trigger_reasons.items():
            action = reconciliation_results[sid]["action"]
            filename = f"{config.LOGS_DIR}/{sid}_{timestamp_str}_{action}_{reason}.jpg"
            cv2.imwrite(filename, annotated)
            print(f"[LOG SAVED] Image recorded: {filename}")

    def run(self):
        cap = cv2.VideoCapture(config.CAMERA_SOURCE)
        if not cap.isOpened():
            print(f"[ERROR] Failed to open video source: {config.CAMERA_SOURCE}")
            return

        print("\n--- SLOTIFY PILOT PIPELINE RUNNING ---")
        print(f"Sampling Baseline: {config.BASELINE_INTERVAL_SEC}s | Burst Rate: {config.BURST_INTERVAL_SEC}s")
        print("Press 'q' in the display window to stop execution.\n")

        while True:
            start_time = time.time()
            ret, frame = cap.read()
            if not ret or frame is None:
                print("[WARNING] Frame capture failed or stream end reached. Re-attempting...")
                time.sleep(1.0)
                continue

            # Run YOLO Detection
            results = self.model(frame, verbose=False)[0]
            detections = sv.Detections.from_ultralytics(results)

            # Evaluate Raw Overlap
            slot_raw_occupied = self._get_raw_occupancy(detections)

            # Anti-Flicker State Evaluation
            current_time = time.time()
            trigger_reasons = self._update_anti_flicker_states(slot_raw_occupied, current_time, detections)

            # Execute Reconciliation
            reconciliation_results = {}
            for slot in self.slots:
                sid = slot["slot_id"]
                vision_state = self.confirmed_vision_state[sid]
                booking = mock_bookings.get_booking(sid)
                
                recon = self.reconcile_slot_state(sid, vision_state, booking)
                reconciliation_results[sid] = recon

                # CLI Logging
                now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                conf_vision = "OCCUPIED" if vision_state else "AVAILABLE"
                b_id = booking["booking_id"] if booking else "NONE"
                
                if sid in trigger_reasons or recon["action"] != "SYNC":
                    reason_msg = f" via [{trigger_reasons[sid]}]" if sid in trigger_reasons else ""
                    print(f"[{now_str}] [{sid}] Vision={conf_vision} | Booking={b_id} -> Action={recon['action']}{reason_msg}")

            # Save frame snapshot if a state change occurred or an alert was raised
            if trigger_reasons:
                self._annotate_and_save(frame, reconciliation_results, trigger_reasons)

            # Display real-time local window
            for slot in self.slots:
                sid = slot["slot_id"]
                pts = slot["points"]
                col = reconciliation_results[sid]["color"]
                for i in range(len(pts)):
                    cv2.line(frame, tuple(pts[i]), tuple(pts[(i + 1) % len(pts)]), col, 2)
            
            cv2.imshow("Slotify Local Pilot Pipeline", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            # Adaptive Dynamic Sampling Sleep
            any_burst_active = any(self.burst_mode_active.values())
            sleep_target = config.BURST_INTERVAL_SEC if any_burst_active else config.BASELINE_INTERVAL_SEC
            
            elapsed = time.time() - start_time
            time_to_sleep = max(0.01, sleep_target - elapsed)
            time.sleep(time_to_sleep)

        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    pipeline = SlotifyPilotPipeline()
    pipeline.run()
