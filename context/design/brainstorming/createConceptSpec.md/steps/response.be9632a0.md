---
timestamp: 'Fri Nov 07 2025 16:48:04 GMT-0500 (Eastern Standard Time)'
parent: '[[..\20251107_164804.3dbf957c.md]]'
content_id: be9632a09b34571601e3f0618d8671f31805f155fbc7d02c213eabdea63f7ee4
---

# response:

```conceptSpec
## Concept: ManageVideo[User, Feedback, PoseData]

**Purpose**: allow dancers and choreographers to upload and manage practice/reference videos
**Principle**: after uploading a video, it can be retrieved for analysis, syncing, or feedback

**State**\
A set of **Videos** with:

*   a videoID String (unique identifier for the video)
*   a title String (user-provided name for the video)
*   a videoType of type practice or reference (categorization of the video)
*   a videoFile File (the actual video file content)
*   a owner User (the user who uploaded the video)
*   a feedback List of Feedback (ordered collection of feedback associated with the video, e.g., by timestamp)
*   a poseData List of PoseData (ordered sequence of pose data extracted or associated with the video, representing temporal information)
*   an uploadTimestamp Date (the date and time the video was uploaded)

**Actions**

*   `upload(videoFile: File, videoType: String, owner: User, title: String): (videoID: String)`
    *   Requires: `videoType` is "practice" or "reference". `title` is not empty. `videoFile` is valid.
    *   Effect: Creates a new video entry with the provided `videoFile`, `videoType`, `title`, and associates it with the `owner`. Sets the `uploadTimestamp` to the current time. Returns the unique `videoID` of the newly created video.

*   `retrieve(videoID: String, caller: User): (videoID: String, title: String, videoType: String, videoFile: File, owner: User, feedback: List<Feedback>, poseData: List<PoseData>, uploadTimestamp: Date)`
    *   Requires: A video with the given `videoID` exists. The `caller` User must be the `owner` of the video.
    *   Effect: Returns all stored metadata and associated data for the specified video, including its `videoID`, `title`, `videoType`, `videoFile`, `owner`, `feedback` list, `poseData` list, and `uploadTimestamp`.

*   `delete(videoID: String, caller: User)`
    *   Requires: A video with the given `videoID` exists. The `caller` User must be the `owner` of the video.
    *   Effect: Removes the video entry identified by `videoID` and all its associated metadata, including `feedback` and `poseData`.

*   `addPosesToVideo(videoID: String, poses: PoseData[])`
    *   Requires: A video with the given `videoID` exists. The `poses` array is not empty.
    *   Effect: Appends the provided `poses` (an array of `PoseData` objects) to the existing `poseData` list of the specified video.
```
