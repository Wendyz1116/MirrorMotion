---
timestamp: 'Fri Nov 07 2025 17:14:01 GMT-0500 (Eastern Standard Time)'
parent: '[[..\20251107_171401.95dfe29b.md]]'
content_id: 38ff9ba6c9bb82de5182902a43cd8b9fa1864fc50877d3ed322cea45ee1c7937
---

# response:

Here's the breakdown of your request:

### 1. Kind of Files Provided

You have provided:

* A **TypeScript code implementation** (`.ts` file) for the `ManageVideoConcept` class.
* A **concept specification** (Markdown format) for `ManageVideoConcept`.
* A **concept specification** (Markdown format) for `FileUploading` (a separate concept).

### 2. Updated `ManageVideo` Concept Specification

Here is the updated `ManageVideo` concept specification, aligned with the provided TypeScript code implementation.

***

## Concept: ManageVideo\[User, Feedback, PoseData]

**Purpose**: allow dancers and choreographers to upload and manage practice/reference videos, storing the actual video files in Google Cloud Storage and their metadata in MongoDB.
**Principle**: after uploading a video, it can be retrieved for analysis, syncing, or feedback.

**State**\
A set of **Videos** with:

* a `videoID` ID (unique identifier for the video)
* an `owner` User (the user who uploaded the video)
* a `videoType` of type "practice" or "reference"
* a `videoName` String (the display name of the video, defaulting to "untitled")
* an optional `referenceVideoId` String (the ID of a reference video, if this is a practice video)
* a `gcsUrl` String (the public URL to the video file in Google Cloud Storage)
* a `gcsFileName` String (the object name in GCS, needed for deletion)
* an optional `feedbackId` Feedback (the ID of feedback associated with this video)
* a `poseData` List of PoseData (extracted pose data for the video)
* an optional `matchingFrames` MatchingFrames (frame ranges to sync practice and reference videos)

**MatchingFrames** (Nested Type):

* `referenceStartFrame`: Number
* `referenceEndFrame`: Number
* `practiceStartFrame`: Number
* `practiceEndFrame`: Number

**Actions**

* `upload(owner: User, videoType: String, file: File | Base64String, videoName?: String, referenceVideoId?: String): (videoID: ID | ErrorMessage)`
  * Requires: `videoType` is "practice" or "reference"; `file` is a valid `File` object or a base64 encoded string.
  * Effect: Creates a new video entry in MongoDB and uploads the `file` to Google Cloud Storage. Associates the video with the `owner` and returns its unique `videoID`. Includes `videoName` and `referenceVideoId` if provided. Returns an error message if the upload fails.

* `addPosesToVideo(videoID: ID, poseData: List of PoseData | JSONString, caller: User, matchingFrames?: MatchingFrames): ()`
  * Requires: The `video` exists, the `caller` is the owner of the video, and `poseData` is a valid `List of PoseData` or a parsable JSON string.
  * Effect: Adds or updates the `poseData` associated with the specified video. Optionally updates `matchingFrames` if provided. Throws an error if validation or update fails.

* `retrieve(videoID: ID, caller: User): (videoID: ID, videoType: String, gcsUrl: String, videoName: String, referenceVideoId: String, feedbackId: Feedback, poseData: List of PoseData, matchingFrames?: MatchingFrames | ErrorMessage)`
  * Requires: The `video` exists and the `caller` is the owner of the video.
  * Effect: Returns the stored video's `videoID`, `videoType`, `gcsUrl`, `videoName`, `referenceVideoId`, associated `feedbackId`, `poseData`, and `matchingFrames`. Returns an error message if the video is not found or the caller is not the owner.

* `delete(videoID: ID, caller: User): (Empty | ErrorMessage)`
  * Requires: The `video` exists and the `caller` is the owner of the video.
  * Effect: Removes the video document and its metadata from MongoDB and deletes the corresponding video file from Google Cloud Storage. Returns an empty object on success, or an error message if deletion fails.

* `streamVideo(videoID: ID, caller: User): (Response)`
  * Requires: The `video` exists and the `caller` is the owner of the video.
  * Effect: Streams the actual video file directly from Google Cloud Storage as a web `Response`. Throws an error if the video is not found, the caller is not the owner, or streaming fails.

* `setMatchingFrames(videoID: ID, caller: User, referenceStartFrame: Number, referenceEndFrame: Number, practiceStartFrame: Number, practiceEndFrame: Number): (Empty | ErrorMessage)`
  * Requires: The `video` exists and the `caller` is the owner of the video.
  * Effect: Updates the `matchingFrames` for the specified video with the provided frame ranges. Returns an empty object on success, or an error message if update fails.

* `storeFeedback(videoID: ID, feedbackId: Feedback, caller: User): (Empty | ErrorMessage)`
  * Requires: The `video` exists and the `caller` is the owner of the video.
  * Effect: Associates the provided `feedbackId` with the specified video by updating its `feedbackId` field. Returns an empty object on success, or an error message if update fails.

**Queries**

* `getPracticeVideos(referenceVideoId: String): (List of Videos)`
  * Requires: `referenceVideoId` exists.
  * Effect: Returns a list of `Video` documents that are of type "practice" and associated with the given `referenceVideoId`.

* `getAllReferenceVideos(caller: User): (List of Videos)`
  * Requires: `caller` exists.
  * Effect: Returns a list of all "reference" `Video` documents owned by the specified `caller`.

***
