# Slotify Step 1 Local Validation Pilot

This is a local runner to validate detection accuracy, spatial slot matching, anti-flicker smoothing, and reconciliation logic under physical camera conditions.

## Execution Sequence

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Camera Source

Open `config.py` and set `CAMERA_SOURCE`:

* USB Webcam: `CAMERA_SOURCE = 0` 
* RTSP Stream: `CAMERA_SOURCE = "rtsp://admin:pass@192.168.1.100:554/stream1"` 
* Local Test Video: `CAMERA_SOURCE = "sample_parking.mp4"` 

### 3. Draw Parking Slot ROIs

Run the interactive ROI polygon drawer:

```bash
python roi_drawer.py
```

* Click 4 vertices around each parking bay.
* Press `n` to complete the slot and start the next one.
* Press `s` to save the polygon bounds to `slots.json`.

### 4. Configure Test Fixtures

Open `mock_bookings.py` and map your created slot IDs (`SLOT_A1`, `SLOT_A2`, etc.) to the fixture cases (ACTIVE, EXPIRED, UPCOMING, NONE) to exercise all 4 reconciliation paths.

### 5. Run the Pilot Pipeline

```bash
python pilot_step1.py
```

### 6. Inspect Results

* Observe live CLI output logs.
* Check `/logs/` for annotated snapshot outputs saved when state changes or alerts are triggered (`SLOT_A1_20260726_140211_UNPAID_OCCUPANCY_ALERT_PERSISTENCE_BUFFER.jpg`).

## Log File Naming Convention

The log files in `/logs/` follow this pattern:
```
{slot_id}_{timestamp}_{action}_{trigger_mechanism}.jpg
```

**Examples:**
- `SLOT_A1_20260726_140211_UNPAID_OCCUPANCY_ALERT_PERSISTENCE_BUFFER.jpg` - Unpaid occupancy detected via persistence buffer
- `SLOT_A2_20260726_140215_GRACE_PERIOD_STARTED_BURST_BYTETRACK_ACTIVE.jpg` - Overstay grace period started during burst tracking
- `SLOT_A3_20260726_140220_AUTO_RELEASE_SLOT_PERSISTENCE_BUFFER.jpg` - No-show auto-release via persistence buffer

## Reconciliation Cases

The pilot exercises 4 reconciliation cases:

1. **Normal/Sync**: Vision state matches booking expectation
2. **Unpaid Occupancy**: Vehicle present without booking
3. **Overstay**: Vehicle present past booking end time (with 10-minute grace period)
4. **No-Show**: Reserved slot unused 15+ minutes past booking start

## Architecture

- **Adaptive Sampling**: 4-second baseline with 500ms burst mode on state changes
- **Anti-Flicker**: Persistence buffer (3 consecutive readings) + ByteTrack during burst windows
- **Slot Matching**: Polygon intersection using shapely with 40% overlap threshold
- **Vehicle Detection**: YOLOv8 Nano with 0.85 confidence threshold (cars, buses, trucks only)

## Troubleshooting

- If `slots.json` is missing, run `roi_drawer.py` first
- If camera fails to open, check `CAMERA_SOURCE` in `config.py`
- If YOLO model doesn't load, it will auto-download on first run
- Ensure all dependencies are installed via `requirements.txt`
