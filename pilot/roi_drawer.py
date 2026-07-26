import cv2
import json
import os
import config

current_polygon = []
all_slots = []
slot_counter = 1

def mouse_callback(event, x, y, flags, param):
    global current_polygon
    if event == cv2.EVENT_LBUTTONDOWN:
        current_polygon.append([x, y])
        print(f"Point added: ({x}, {y}) - Total points: {len(current_polygon)}")

def main():
    global current_polygon, slot_counter
    
    cap = cv2.VideoCapture(config.CAMERA_SOURCE)
    ret, frame = cap.read()
    cap.release()
    
    if not ret or frame is None:
        print(f"[ERROR] Could not capture frame from source: {config.CAMERA_SOURCE}")
        return

    clone = frame.copy()
    cv2.namedWindow("Slotify ROI Drawer")
    cv2.setMouseCallback("Slotify ROI Drawer", mouse_callback)

    print("\n--- SLOTIFY ROI DRAWER ---")
    print("1. Click 4 points to define a slot polygon (clockwise/counter-clockwise).")
    print("2. Press 'n' to confirm current slot and start drawing the next slot.")
    print("3. Press 's' to save all defined slots to 'slots.json' and exit.")
    print("4. Press 'r' to reset current drawing.")
    print("5. Press 'q' to quit without saving.\n")

    while True:
        temp_img = frame.copy()
        
        # Draw existing finalized slots
        for slot in all_slots:
            pts = [(p[0], p[1]) for p in slot["points"]]
            for i in range(len(pts)):
                cv2.line(temp_img, pts[i], pts[(i + 1) % len(pts)], (0, 255, 0), 2)
            cv2.putText(temp_img, slot["slot_id"], pts[0], cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        # Draw currently active polygon
        if len(current_polygon) > 0:
            for pt in current_polygon:
                cv2.circle(temp_img, tuple(pt), 4, (0, 0, 255), -1)
            if len(current_polygon) > 1:
                for i in range(len(current_polygon) - 1):
                    cv2.line(temp_img, tuple(current_polygon[i]), tuple(current_polygon[i+1]), (255, 0, 0), 2)

        cv2.imshow("Slotify ROI Drawer", temp_img)
        key = cv2.waitKey(20) & 0xFF

        if key == ord('n'):
            if len(current_polygon) >= 3:
                slot_id = f"SLOT_A{slot_counter}"
                all_slots.append({"slot_id": slot_id, "points": current_polygon})
                print(f"[SUCCESS] Saved {slot_id} with {len(current_polygon)} vertices.")
                slot_counter += 1
                current_polygon = []
                frame = clone.copy()
            else:
                print("[WARNING] Polygon must have at least 3 points before saving!")

        elif key == ord('r'):
            current_polygon = []
            print("[INFO] Reset current polygon.")

        elif key == ord('s'):
            if all_slots:
                with open(config.SLOTS_CONFIG_FILE, "w") as f:
                    json.dump(all_slots, f, indent=4)
                print(f"\n[COMPLETE] Successfully saved {len(all_slots)} slots to {config.SLOTS_CONFIG_FILE}")
            else:
                print("[WARNING] No slots created to save!")
            break

        elif key == ord('q'):
            print("[INFO] Exited without saving.")
            break

    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
