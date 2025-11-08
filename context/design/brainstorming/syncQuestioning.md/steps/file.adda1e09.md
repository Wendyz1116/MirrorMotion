---
timestamp: 'Fri Nov 07 2025 22:44:33 GMT-0500 (Eastern Standard Time)'
parent: '[[..\20251107_224433.fa7f784e.md]]'
content_id: adda1e09ced7b85af24a641d420ad7a8c7c53a301f2406fe4d5be239e20d0ceb
---

# file: src\syncs\video.sync.ts

```typescript
import { actions, Frames, Sync } from "@engine";
import { ManageVideo, Requesting, Sessioning } from "@concepts"; // Assuming ManageVideo is exported from @concepts/ManageVideo/ManageVideoConcept.ts

// Helper for success response with a generic "status: success"
const respondSuccess = (request: symbol) =>
  actions([Requesting.respond, { request, status: "success" }]);

// Helper for error response
const respondError = (request: symbol, error: symbol) =>
  actions([Requesting.respond, { request, error }]);

// --- Video Upload ---

// Trigger `ManageVideo.upload` when a request comes in
export const RequestUploadVideo: Sync = ({
  request,
  session,
  videoType,
  videoName,
  referenceVideoId,
  user, // Variable to hold the owner's ID
  fileData, // Symbol to hold the extracted file data
}) => ({
  when: actions([
    Requesting.request,
    {
      path: "/ManageVideo/upload",
      session,
      videoType,
      videoName,
      referenceVideoId,
    },
    { request },
  ]),
  where: async (frames) => {
    console.log("Starting upload sync");

    // Extract file from the original request frame
    const requestFrame = frames[0];
    console.log("Request frame:", requestFrame);
    const actualFile = requestFrame.file;

    console.log("File type:", typeof actualFile, "length:", actualFile?.length);

    // Authorize the request: ensure a valid session exists and bind the user
    frames = await frames.query(Sessioning._getUser, { session }, { user });

    if (frames.length === 0) {
      return new Frames({ [request]: { error: "Invalid session" } });
    }
    // Bind the file data to the fileData symbol so it can be used in then
    return new Frames({ ...frames[0], [fileData]: actualFile });
  },
  then: actions([
    ManageVideo.upload,
    { owner: user, videoType, file: fileData, videoName, referenceVideoId },
  ]),
});

// Respond to the client upon successful video upload
export const UploadVideoResponseSuccess: Sync = ({ request, video }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/upload" }, { request }],
    [ManageVideo.upload, {}, { video }],
  ),
  then: actions([Requesting.respond, { request, video }]),
});

// Respond to the client upon error during video upload
export const UploadVideoResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/upload" }, { request }],
    [ManageVideo.upload, {}, { error }],
  ),
  then: respondError(request, error),
});

// --- Add Poses To Video ---

// Trigger `ManageVideo.addPosesToVideo` when a request comes in
export const RequestAddPosesToVideo: Sync = ({
  request,
  session,
  video: videoId,
  poseData,
  user, // Variable to hold the caller's ID
}) => ({
  when: actions([
    Requesting.request,
    {
      path: "/ManageVideo/addPosesToVideo",
      session,
      video: videoId,
      poseData,
    },
    { request },
  ]),
  where: async (frames) => {
    console.log("ahh");
    // Extract actual values from the request frame
    const requestFrame = frames[0];
    const actualVideoId = requestFrame[videoId];
    const actualPoseData = requestFrame[poseData];

    console.log("Adding poses to video:", actualVideoId);

    // Authorize the user
    frames = await frames.query(Sessioning._getUser, { session }, { user });

    if (frames.length === 0) {
      return new Frames({ [request]: { error: "Invalid session" } });
    }

    // Bind the extracted values to the frames so they can be used in then
    const userFrame = frames[0];
    return new Frames({
      ...userFrame,
      [videoId]: actualVideoId,
      [poseData]: actualPoseData,
    });
  },
  then: actions([
    ManageVideo.addPosesToVideo,
    { video: videoId, poseData, caller: user },
  ]),
});

// Respond to client on successful pose data addition
export const AddPosesToVideoResponseSuccess: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/addPosesToVideo" }, { request }],
    [ManageVideo.addPosesToVideo, {}, {}], // Empty success result
  ),
  then: respondSuccess(request),
});

// Respond to client on error during pose data addition
export const AddPosesToVideoResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/addPosesToVideo" }, { request }],
    [ManageVideo.addPosesToVideo, {}, { error }],
  ),
  then: respondError(request, error),
});

// --- Delete Video ---

// Trigger `ManageVideo.delete` when a request comes in
export const RequestDeleteVideo: Sync = (
  { request, session, video: videoId, user },
) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/delete", session, video: videoId },
    { request },
  ]),
  where: async (frames) => {
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    return frames;
  },
  then: actions([
    ManageVideo.delete,
    { video: videoId, caller: user },
  ]),
});

// Respond to client on successful video deletion
export const DeleteVideoResponseSuccess: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/delete" }, { request }],
    [ManageVideo.delete, {}, {}], // Empty success result
  ),
  then: respondSuccess(request),
});

// Respond to client on error during video deletion
export const DeleteVideoResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/delete" }, { request }],
    [ManageVideo.delete, {}, { error }],
  ),
  then: respondError(request, error),
});

// --- Set Matching Frames ---

// Trigger `ManageVideo.setMatchingFrames` when a request comes in
export const RequestSetMatchingFrames: Sync = ({
  request,
  session,
  video: videoId,
  referenceStartFrame,
  referenceEndFrame,
  practiceStartFrame,
  practiceEndFrame,
  user,
}) => ({
  when: actions([
    Requesting.request,
    {
      path: "/ManageVideo/setMatchingFrames",
      session,
      video: videoId,
      referenceStartFrame,
      referenceEndFrame,
      practiceStartFrame,
      practiceEndFrame,
    },
    { request },
  ]),
  where: async (frames) => {
    console.log("ahh");
    // Extract actual values from the request frame
    const requestFrame = frames[0];
    const actualVideoId = requestFrame[videoId];
    const actualReferenceStartFrame = requestFrame[referenceStartFrame];
    const actualReferenceEndFrame = requestFrame[referenceEndFrame];
    const actualPracticeStartFrame = requestFrame[practiceStartFrame];
    const actualPracticeEndFrame = requestFrame[practiceEndFrame];

    console.log("Setting matching frames for video:", actualVideoId);

    // Authorize the user
    frames = await frames.query(Sessioning._getUser, { session }, { user });

    if (frames.length === 0) {
      return new Frames({ [request]: { error: "Invalid session" } });
    }

    // Bind the extracted values to the frames so they can be used in then
    const userFrame = frames[0];
    return new Frames({
      ...userFrame,
      [videoId]: actualVideoId,
      [referenceStartFrame]: actualReferenceStartFrame,
      [referenceEndFrame]: actualReferenceEndFrame,
      [practiceStartFrame]: actualPracticeStartFrame,
      [practiceEndFrame]: actualPracticeEndFrame,
    });
  },
  then: actions([
    ManageVideo.setMatchingFrames,
    {
      video: videoId,
      caller: user,
      referenceStartFrame,
      referenceEndFrame,
      practiceStartFrame,
      practiceEndFrame,
    },
  ]),
});

// Respond to client on successful matching frames update
export const SetMatchingFramesResponseSuccess: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/setMatchingFrames" }, {
      request,
    }],
    [ManageVideo.setMatchingFrames, {}, {}],
  ),
  then: respondSuccess(request),
});

// Respond to client on error during matching frames update
export const SetMatchingFramesResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/setMatchingFrames" }, {
      request,
    }],
    [ManageVideo.setMatchingFrames, {}, { error }],
  ),
  then: respondError(request, error),
});

// --- Store Feedback ---

// Trigger `ManageVideo.storeFeedback` when a request comes in
export const RequestStoreFeedback: Sync = (
  { request, session, video: videoId, feedbackId, user },
) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/storeFeedback", session, video: videoId, feedbackId },
    { request },
  ]),
  where: async (frames) => {
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    return frames;
  },
  then: actions([
    ManageVideo.storeFeedback,
    { video: videoId, feedbackId, caller: user },
  ]),
});

// Respond to client on successful feedback storage
export const StoreFeedbackResponseSuccess: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/storeFeedback" }, { request }],
    [ManageVideo.storeFeedback, {}, {}],
  ),
  then: respondSuccess(request),
});

// Respond to client on error during feedback storage
export const StoreFeedbackResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/storeFeedback" }, { request }],
    [ManageVideo.storeFeedback, {}, { error }],
  ),
  then: respondError(request, error),
});
// --- Retrieve Video Metadata (Query) ---

// Handle request for retrieving video metadata
export const RequestRetrieveVideo: Sync = ({
  request,
  session,
  video,
  user,
  result, // Variable to hold the VideoDoc result
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/_retrieve", session, video },
    { request },
  ]),
  where: async (frames) => {
    console.log("Authorizing retrieve video request", session, user);

    // Extract the actual video ID value from the request frame FIRST
    const requestFrame = frames[0];
    const actualVideoId = requestFrame[video]; // Get the value bound to the video symbol

    // Authorize the user
    frames = await frames.query(Sessioning._getUser, { session }, { user });

    if (frames.length === 0) {
      return new Frames({ [result]: null });
    }

    // Get the user from the frame
    const userFrame = frames[0];
    const userId = userFrame[user];

    // Call the query method directly and get the result
    try {
      const videoDoc = await ManageVideo._retrieve({
        video: actualVideoId,
        caller: userId,
      });

      console.log("Video retrieved:", videoDoc._id);

      // Manually bind the result to the result symbol
      return new Frames({ ...userFrame, [result]: videoDoc });
    } catch (error) {
      console.error("Error retrieving video:", error);
      // Return error frame
      return new Frames({ ...userFrame, error: error.message });
    }
  },
  then: actions([Requesting.respond, { request, result }]),
});

// --- Get Practice Videos (Query) ---

// Handle request for practice videos associated with a reference video
export const RequestGetPracticeVideos: Sync = ({
  request,
  session,
  referenceVideoId,
  user, // For session authorization
  results, // Variable to hold the collected array of video documents
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/_getPracticeVideos", session, referenceVideoId },
    { request },
  ]),
  where: async (frames) => {
    const originalFrame = frames[0];

    // Extract the actual referenceVideoId value from the request
    const actualReferenceVideoId = originalFrame[referenceVideoId];

    // Authorize the user
    frames = await frames.query(Sessioning._getUser, { session }, { user });

    // Check if authorization succeeded
    if (frames.length === 0) {
      return new Frames({ ...originalFrame, [results]: [] });
    }

    // Get the user from the frame
    const userFrame = frames[0];
    const userId = userFrame[user];

    // Call the query method directly and get the results
    const videoDocs = await ManageVideo._getPracticeVideos({
      referenceVideoId: actualReferenceVideoId,
      caller: userId,
    });

    console.log("Practice videos fetched:", videoDocs.length);

    // Manually bind the results array to the results symbol
    return new Frames({ ...userFrame, [results]: videoDocs });
  },
  then: actions([Requesting.respond, { request, results }]),
});

// --- Get All Reference Videos (Query) ---

// Handle request for all reference videos owned by the caller
export const RequestGetAllReferenceVideos: Sync = ({
  request,
  session,
  user, // For session authorization and as caller for the query
  results, // Variable to hold the collected array of video documents
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/_getAllReferenceVideos", session },
    { request },
  ]),
  where: async (frames) => {
    // Authorize the user
    frames = await frames.query(Sessioning._getUser, { session }, { user });

    // Check if authorization succeeded
    if (frames.length === 0) {
      return new Frames({ [results]: [] });
    }

    // Get the user from the frame
    const userFrame = frames[0];
    const userId = userFrame[user];

    // Call the query method directly and get the results
    const videoDocs = await ManageVideo._getAllReferenceVideos({
      caller: userId,
    });

    console.log("Videos fetched:", videoDocs.length);

    // Manually bind the results array to the results symbol
    return new Frames({ ...userFrame, [results]: videoDocs });
  },
  then: actions([Requesting.respond, { request, results }]),
});

```
