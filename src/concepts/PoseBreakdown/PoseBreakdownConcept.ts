import { ID } from "@utils/types.ts"; // Assuming @utils/types.ts provides ID type.
import { PoseLandmarker } from "@mediapipe/tasks-vision";

// A set of PointData with: a location Number
// MediaPipe provides 3D coordinates (normalized 0-1)
export interface PointData {
  x: number;
  y: number;
  z: number;
}

// Enum for standard body parts (derived from MediaPipe's keypoint names)
export enum PartEnum {
  NOSE = "NOSE",
  LEFT_SHOULDER = "LEFT_SHOULDER",
  RIGHT_SHOULDER = "RIGHT_SHOULDER",
  LEFT_ELBOW = "LEFT_ELBOW",
  RIGHT_ELBOW = "RIGHT_ELBOW",
  LEFT_WRIST = "LEFT_WRIST",
  RIGHT_WRIST = "RIGHT_WRIST",
  LEFT_HIP = "LEFT_HIP",
  RIGHT_HIP = "RIGHT_HIP",
  LEFT_KNEE = "LEFT_KNEE",
  RIGHT_KNEE = "RIGHT_KNEE",
  LEFT_ANKLE = "LEFT_ANKLE",
  RIGHT_ANKLE = "RIGHT_ANKLE",
}

// A set of PartData with: a part Enum, a pointData Set of PointData
export interface PartData {
  part: PartEnum;
  pointData: PointData;
}

// A set of PoseData with: a poseID String, a partData of Set of PartData
export interface PoseData {
  poseID: ID;
  partData: Array<PartData>;
}

/**
 * @concept PoseBreakdown
 * @purpose extract poses from videos and represent them as collections of parts and points, which can later be compared
 * @principle after a video is processed, poses for each frame are stored as structured data
 */
export default class PoseBreakdownConcept {
  private readonly poses: Map<ID, PoseData> = new Map();

  constructor() {
    // This concept does not have direct database dependencies for its state,
    // as it's meant to define the structure and logic for pose data itself.
  }

  public getPoseData(poseID: ID): PoseData | undefined {
    return this.poses.get(poseID);
  }
}
