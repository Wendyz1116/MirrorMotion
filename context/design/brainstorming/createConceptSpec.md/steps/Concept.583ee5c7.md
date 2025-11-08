---
timestamp: 'Fri Nov 07 2025 17:01:18 GMT-0500 (Eastern Standard Time)'
parent: '[[..\20251107_170118.5145934d.md]]'
content_id: 583ee5c7ae94172a383d175d48049cd16b5b852a4f22cc78b148bc35525d25ac
---

# Concept: ManageVideo\[User, Feedback, PoseData]

## Purpose

Allow dancers and choreographers to upload and manage practice/reference videos, facilitating detailed analysis, synchronization, and collaborative feedback processes.

## Principle

After uploading a video, it becomes a persistent resource that can be retrieved, analyzed, have pose data and feedback associated with it, and managed by its owner.

## State

* a set of **Videos** with:
  * a `videoID` String (Unique identifier for the video)
  * a `title` String (Optional user-defined title for the video)
  * a `description` String (Optional user-defined description for the video)
  * a `videoType` of type `VideoType` (Enum: `PRACTICE`, `REFERENCE`)
  * a `videoFileReference` String (A reference/path to the actual video file storage)
  * a `thumbnailFileReference` String (Optional reference/path to a thumbnail image file)
  * an `owner` User (The user who uploaded and owns the video)
  * an `uploadTimestamp` DateTime (The date and time when the video was uploaded)
  * a `lastModifiedTimestamp` DateTime (The date and time when the video's metadata was last updated)
  * a `status` of type `VideoStatus` (Enum: `PENDING_UPLOAD`, `PROCESSING`, `READY`, `FAILED`)
  * a `feedback` Set of `Feedback` (A collection of feedback items associated with the video)
  * a `poseData` Set of `PoseData` (A collection of pose data entries associated with the video)

## Actions

* `upload(videoFile: File, videoType: VideoType, owner: User, title?: String, description?: String): (videoID: String)`
  * **Requires**: `videoType` is `PRACTICE` or `REFERENCE`. `videoFile` is a valid file. `owner` is a valid `User`.
  * **Effect**: Creates a new video entry with the provided `videoFile`, `videoType`, `owner`, `title`, and `description`. It sets `uploadTimestamp` to the current time, `lastModifiedTimestamp` to the current time, `status` to `PROCESSING`, and initializes `feedback` and `poseData` as empty sets. Returns the unique `videoID`. The actual video file is stored, and `videoFileReference` is updated.
  * *(Hypothetical addition: `title`, `description` for better organization, `status` for asynchronous processing, `videoFileReference` as string not raw File)*

* `updateVideoMetadata(videoID: String, caller: User, newTitle?: String, newDescription?: String, newVideoType?: VideoType): void`
  * **Requires**: Video specified by `videoID` exists. `caller` is the `owner` of the video. At least one of `newTitle`, `newDescription`, or `newVideoType` must be provided.
  * **Effect**: Updates the specified `title`, `description`, or `videoType` of the video. Sets `lastModifiedTimestamp` to the current time.
  * *(Hypothetical addition: A separate action for updating metadata without re-uploading the file.)*

* `delete(videoID: String, caller: User): void`
  * **Requires**: Video specified by `videoID` exists. `caller` is the `owner` of the video.
  * **Effect**: Permanently removes the video identified by `videoID`, along with all its associated metadata (title, description, videoType, owner, timestamps, status, feedback, poseData) and the actual stored `videoFile` and `thumbnailFile`.

* `addPosesToVideo(videoID: String, poses: PoseData[]): void`
  * **Requires**: Video specified by `videoID` exists. All `PoseData` objects in `poses` are valid.
  * **Effect**: Adds the provided `poses` to the `poseData` set of the video. Sets `lastModifiedTimestamp` to the current time.

* `addFeedbackToVideo(videoID: String, feedbackText: String, creator: User): (feedbackID: String)`
  * **Requires**: Video specified by `videoID` exists. `feedbackText` is not empty. `creator` is a valid `User`.
  * **Effect**: Creates a new `Feedback` entry with the provided `feedbackText` and `creator`, associates it with the video, and adds it to the video's `feedback` set. Sets `lastModifiedTimestamp` to the current time. Returns the unique `feedbackID`.
  * *(Hypothetical addition: Specific action for adding feedback with more detail.)*

* `removeFeedbackFromVideo(videoID: String, feedbackID: String, caller: User): void`
  * **Requires**: Video specified by `videoID` exists. `feedback` with `feedbackID` exists within that video. `caller` is either the video `owner` or the `creator` of the `feedback` item.
  * **Effect**: Removes the specified `feedback` entry from the video's `feedback` set. Sets `lastModifiedTimestamp` to the current time.
  * *(Hypothetical addition: Action for removing specific feedback.)*

## Queries

* `retrieve(videoID: String, caller: User): (videoID, title, description, videoType, videoFileReference, thumbnailFileReference, owner, uploadTimestamp, lastModifiedTimestamp, status, feedback[], poseData[])`
  * **Requires**: Video specified by `videoID` exists. `caller` is the `owner` of the video.
  * **Effect**: Returns all available details for the video, including its metadata, file references, feedback, and pose data.
  * *(Hypothetical change: Now returns ALL state attributes for consistency and completeness)*

* `retrieveAllVideosForUser(owner: User): (Set of VideoMetadata)`
  * **Requires**: `owner` is a valid `User`.
  * **Effect**: Returns a collection of `VideoMetadata` objects for all videos owned by the `owner`. `VideoMetadata` typically includes `videoID`, `title`, `description`, `videoType`, `thumbnailFileReference`, `uploadTimestamp`, and `status`, but *excludes* the full `videoFileReference`, `feedback`, and `poseData` for efficiency in listing.
  * *(Hypothetical addition: Query to get a list/summary of all videos for a user.)*

* `getPoseDataForVideo(videoID: String): (Set of PoseData)`
  * **Requires**: Video specified by `videoID` exists.
  * **Effect**: Returns the complete set of `PoseData` associated with the video.
  * *(Hypothetical addition: Specific query to get only pose data.)*

* `getFeedbackForVideo(videoID: String): (Set of Feedback)`
  * **Requires**: Video specified by `videoID` exists.
  * **Effect**: Returns the complete set of `Feedback` associated with the video.
  * *(Hypothetical addition: Specific query to get only feedback.)*

***

To provide a precise update, please provide the content of `../../src/concepts/ManageVideo/ManageVideoConcept.ts`.
