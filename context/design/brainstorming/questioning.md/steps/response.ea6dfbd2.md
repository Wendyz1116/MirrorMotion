---
timestamp: 'Fri Nov 07 2025 17:07:17 GMT-0500 (Eastern Standard Time)'
parent: '[[..\20251107_170717.696e1372.md]]'
content_id: ea6dfbd250316278d8f23a6250f36a66744253870f0123dda2f7b844476ee0b4
---

# response:

I appreciate you providing the `Concept: ManageVideo` specification!

However, I cannot see `currentConceptCodeImplementationTs` because it was not included in your prompt. I need the actual TypeScript code content to be able to:

1. Read the code and list all current functions.
2. Compare it against your `currentConceptSpec`.
3. Update the `currentConceptSpec` state and actions/queries to reflect the implementation.

**Please provide the content of `currentConceptCodeImplementationTs` so I can assist you further.**

***

Once you provide the code, I will update the spec following your requested format, for example:

**State:**

* a set of **Videos** with:
  * a `videoID` String
  * a `videoType` of type `practice` or `reference`
  * a `videoFile` File
  * a `owner` User
  * a `feedback` Set of Feedback
  * a `poseData` Set of PoseData
  * **`newFieldName` NewType** (example of new state field from code)

**Actions:**

* `upload(videoFile, videoType: String, owner: User): (videoID: String)`
  * Requires: videoType is practice or reference
  * Effect: creates a new video entry with videoFile and videoType, stores it associated with the owner, and returns the unique videoID
* `retrieve(videoID: String, caller: User): (videoType, videoFile, feedback)`
  * Requires: video exists and the caller is the owner of the video
  * Effect: returns the stored videoType, videoFile, and associated feedback
* `delete(videoID: String, caller: User)`
  * Requires: video exists and the caller is the owner of the video
  * Effect: removes the video and its metadata
* `addPosesToVideo(videoID: String, poses: PoseData[])`
  * Requires: video and all PoseData in poses exists
  * Effect: add poses to the video
* **`newActionOrQueryFromCode(param: Type): ReturnType`** (example of new action/query from code)
  * Requires: ...
  * Effect: ...

***

**For now, here is the `currentConceptSpec` you provided:**

## Concept: ManageVideo\[User, Feedback, PoseData]

**Purpose**: allow dancers and choreographers to upload and manage practice/reference videos\
**Principle**: after uploading a video, it can be retrieved for analysis, syncing, or feedback

**State**\
A set of **Videos** with:

* a `videoID` String
* a `videoType` of type `practice` or `reference`
* a `videoFile` File
* a `owner` User
* a `feedback` Set of Feedback
* a `poseData` Set of PoseData

**Actions**

* `upload(videoFile, videoType: String, owner: User): (videoID: String)`
  * Requires: videoType is practice or reference
  * Effect: creates a new video entry with videoFile and videoType, stores it associated with the owner, and returns the unique videoID
* `retrieve(videoID: String, caller: User): (videoType, videoFile, feedback)`
  * Requires: video exists and the caller is the owner of the video
  * Effect: returns the stored videoType, videoFile, and associated feedback
* `delete(videoID: String, caller: User)`
  * Requires: video exists and the caller is the owner of the video
  * Effect: removes the video and its metadata
* `addPosesToVideo(videoID: String, poses: PoseData[])`
  * Requires: video and all PoseData in poses exists
  * Effect: add poses to the video
