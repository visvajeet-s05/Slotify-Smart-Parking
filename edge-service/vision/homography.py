"""Bird's-eye-view calibration primitives."""
import cv2
import numpy as np

def compute_bev_matrix(pixel_pts, ground_pts):
    if len(pixel_pts) != 4 or len(ground_pts) != 4:
        raise ValueError("Exactly four pixel and ground calibration points are required")
    matrix, _ = cv2.findHomography(np.float32(pixel_pts), np.float32(ground_pts))
    if matrix is None:
        raise ValueError("Unable to calculate homography")
    return matrix

def project_point(matrix, pixel):
    point = cv2.perspectiveTransform(np.float32([[pixel]]), matrix)[0][0]
    return float(point[0]), float(point[1])
