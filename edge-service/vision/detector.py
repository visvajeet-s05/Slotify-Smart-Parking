from dataclasses import dataclass
from .homography import project_point

@dataclass(frozen=True)
class Vehicle:
    track_id: int
    box: tuple[float, float, float, float]
    confidence: float
    ground_xy: tuple[float, float]

class VehicleDetector:
    """TensorRT/Ultralytics adapter. ByteTrack is enabled by Ultralytics persist mode."""
    def __init__(self, engine_path: str, homography):
        from ultralytics import YOLO
        self.model, self.homography = YOLO(engine_path), homography

    def detect_batch(self, frames):
        results = self.model.track(frames, persist=True, tracker="bytetrack.yaml", classes=[2], verbose=False)
        output = []
        for result in results:
            vehicles = []
            for box in result.boxes:
                x1, y1, x2, y2 = map(float, box.xyxy[0].tolist())
                center = ((x1 + x2) / 2, (y1 + y2) / 2)
                vehicles.append(Vehicle(int(box.id[0]) if box.id is not None else -1, (x1,y1,x2,y2), float(box.conf[0]), project_point(self.homography, center)))
            output.append(vehicles)
        return output
