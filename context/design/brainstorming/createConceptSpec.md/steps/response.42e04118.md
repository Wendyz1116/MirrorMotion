---
timestamp: 'Fri Nov 07 2025 17:15:17 GMT-0500 (Eastern Standard Time)'
parent: '[[..\20251107_171517.83193a58.md]]'
content_id: 42e04118f370160641901b12d4f03e8a231a6368a4705d156bbece0b89fa38c0
---

# response:

Okay, let's update the `ManageVideo` concept specification to reflect the provided TypeScript code implementation.

Here's the updated concept specification:

***

## Concept: ManageVideo\[User, Feedback, PoseData]

**Purpose**: allow dancers and choreographers to upload and manage practice/reference videos, storing the actual video files in Google Cloud Storage and their metadata in MongoDB.
**Principle**: After uploading a video, it can be retrieved for analysis, syncing, or feedback.

**State**\
A set of **Videos** with:

* a `_id` Video (unique identifier for the video)
* an `owner` User (the user who uploaded the video)
* a `videoType` of type "practice" or "reference"
* a `videoName` String (the display name of the video)
* an optional `referenceVideoId` String (the ID of a reference video, if this is a practice video)
* a `gcsUrl` String (the public URL of the video in Google Cloud Storage)
* a `gcsFileName` String (the object name in GCS, needed for deletion)
* a `feedback` Feedback (the ID of feedback associated with this video)
* a `poseData` Set of PoseData (an array of pose data associated with this video)
* an optional `matchingFrames` of type MatchingFrames (defines frame ranges for syncing reference and practice videos)

**MatchingFrames** structure:

* `referenceStartFrame` Number
* `referenceEndFrame` Number
* `practiceStartFrame` Number
* `practiceEndFrame` Number

**Actions**

* `upload({ owner: User, videoType: "practice" | "reference", file: File | string, videoName?: string, referenceVideoId?: string }): { video: Video } | { error: string }`
  * **Requires**: `videoType` is "practice" or "reference". `file` must be a valid `File` object or a base64 encoded string.
  * **Effect**: A new video entry is created in MongoDB with a unique `_id`, `owner`, `videoType`, `videoName`, `referenceVideoId`, and a GCS URL. The video file is uploaded to Google Cloud Storage. Returns the ID of the new video on success, or an error message.

* `addPosesToVideo({ video: Video, poseData: PoseData[] | string, caller: User, matchingFrames?: MatchingFrames }): () | { error: string }`
  * **Requires**: `video` exists. `caller` is the owner of the video. `poseData` is a valid array of `PoseData` objects or a JSON string parseable into such an array.
  * **Effect**: Updates the `poseData` field of the specified video. If `matchingFrames` is provided, it also updates the `matchingFrames` field. Throws an error if validation or update fails.

* `retrieve({ video: Video, caller: User }): { videoId: Video, videoType: "practice" | "reference", gcsUrl: string, videoName: string, referenceVideoId: string, feedback: Feedback, poseData: PoseData[], matchingFrames?: MatchingFrames } | { error: string }`
  * **Requires**: `video` exists and `caller` is the owner of the video.
  * **Effect**: Returns the video's `_id`, `videoType`, `gcsUrl`, `videoName`, `referenceVideoId`, `feedback`, `poseData`, and `matchingFrames`. Returns an error message if the video is not found or the caller is not the owner.

* `streamVideo({ video: Video, caller: User }): Response | { error: string }`
  * **Requires**: `video` exists and `caller` is the owner of the video.
  * **Effect**: Streams the actual video file directly from Google Cloud Storage to the client as a `Response` object. Returns an error object if the video is not found, the caller is not the owner, or streaming fails.

* `delete({ video: Video, caller: User }): Empty | { error: string }`
  * **Requires**: `video` exists and `caller` is the owner of the video.
  * **Effect**: Removes the video document and its metadata from MongoDB. Deletes the corresponding video file from Google Cloud Storage. Returns an empty object on success, or an error message.

* `setMatchingFrames({ video: Video, caller: User, referenceStartFrame: number, referenceEndFrame: number, practiceStartFrame: number, practiceEndFrame: number }): () | { error: string }`
  * **Requires**: `video` exists and `caller` is the owner of the video. All frame numbers are valid.
  * **Effect**: Updates the `matchingFrames` field for the specified video with the provided frame ranges. Returns an error message if the video is not found or the caller is not the owner.

* `storeFeedback({ video: Video, feedbackId: Feedback, caller: User }): Empty | { error: string }`
  * **Requires**: `video` exists and `caller` is the owner of the video. `feedbackId` refers to an existing feedback entry.
  * **Effect**: Updates the `feedback` field of the specified video with the given `feedbackId`. Returns an empty object on success, or an error message.

**Queries**

* `getPracticeVideos({ referenceVideoId: string }): VideoDoc[]`
  * **Requires**: `referenceVideoId` is a valid video ID.
  * **Effect**: Returns an array of all practice videos that are associated with the given `referenceVideoId`.

* `getAllReferenceVideos({ caller: User }): VideoDoc[]`
  * **Requires**: `caller` is a valid user.
  * **Effect**: Returns an array of all reference videos owned by the `caller`.

***

**Current functions available in `ManageVideoConcept` implementation:**

1. `constructor(private readonly db: Db)`
2. `async upload({ owner, videoType, file, videoName, referenceVideoId }: { owner: User; videoType: "practice" | "reference"; file: File | string; videoName?: string; referenceVideoId?: string; }): Promise<{ video: Video } | { error: string }>`
3. `async addPosesToVideo({ video: videoId, poseData, caller, matchingFrames }: { video: Video; poseData: PoseData[] | string; caller: User; matchingFrames?: MatchingFrames; })` (Note: the return type in the code's signature is `Promise<void>` but the implementation throws errors, so `() | { error: string }` is more accurate for a spec)
4. `async retrieve({ video: videoId, caller }: { video: Video; caller: User; }): Promise<{ videoId: Video; videoType: "practice" | "reference"; gcsUrl: string; videoName: string; referenceVideoId: string; feedback: Feedback; poseData: PoseData[]; matchingFrames?: MatchingFrames; } | { error: string }>`
5. `async streamVideo({ video, caller }: { video: Video; caller: User; }): Promise<Response>` (Note: the implementation throws errors as `{ error: string }` but the type definition is `Response`, the spec reflects the common outcome)
6. `async delete({ video: videoId, caller }: { video: Video; caller: User; }): Promise<Empty | { error: string }>`
7. `async setMatchingFrames({ video, caller, referenceStartFrame, referenceEndFrame, practiceStartFrame, practiceEndFrame }: { video: Video; caller: User; referenceStartFrame: number; referenceEndFrame: number; practiceStartFrame: number; practiceEndFrame: number; })` (Note: the return type in the code's signature is `Promise<void>` but the implementation returns `{ error: string }` for failures, so `() | { error: string }` is more accurate for a spec)
8. `async storeFeedback({ video, feedbackId, caller }: { video: Video; feedbackId: Feedback; caller: User; }): Promise<Empty | { error: string }>`
9. `async getPracticeVideos({ referenceVideoId }: { referenceVideoId: string; }): Promise<VideoDoc[]>`
10. `async getAllReferenceVideos({ caller }: { caller: User; }): Promise<VideoDoc[]>`
