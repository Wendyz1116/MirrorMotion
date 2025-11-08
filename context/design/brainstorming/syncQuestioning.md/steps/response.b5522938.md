---
timestamp: 'Fri Nov 07 2025 17:20:27 GMT-0500 (Eastern Standard Time)'
parent: '[[..\20251107_172027.cc1342a0.md]]'
content_id: b55229389f737cfd20059c3ec5602c46c37f3886c4e270ed0e01d2ed558139d2
---

# response:

Here's a `manageVideo.sync.ts` file with synchronizations for the `ManageVideo` concept, following the patterns from `auth.sync.ts` and general synchronization guidelines.

```typescript
// src/syncs/manageVideo.sync.ts
import { actions, Sync, Frames } from "@engine";
import { Requesting, Sessioning, ManageVideo } from "@concepts"; // Assuming ManageVideo is exported from @concepts/ManageVideo/ManageVideoConcept.ts

// Helper for success response with a generic "status: success"
const respondSuccess = (request: symbol) => actions([Requesting.respond, { request, status: "success" }]);

// Helper for error response
const respondError = (request: symbol, error: symbol) => actions([Requesting.respond, { request, error }]);

// --- 1. Video Upload ---

// Trigger `ManageVideo.upload` when a request comes in
export const RequestUploadVideo: Sync = ({
  request,
  session,
  videoType,
  file, // Expecting base64 string or URL
  videoName,
  referenceVideoId,
  user, // Variable to hold the owner's ID
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/upload", session, videoType, file, videoName, referenceVideoId },
    { request },
  ]),
  where: async (frames) => {
    // Authorize the request: ensure a valid session exists and bind the user
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    return frames;
  },
  then: actions([
    ManageVideo.upload,
    { owner: user, videoType, file, videoName, referenceVideoId },
  ]),
});

// Respond to the client upon successful video upload
export const UploadVideoResponseSuccess: Sync = ({ request, video }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/upload" }, { request }],
    [ManageVideo.upload, {}, { video }], // Matches the 'video' output parameter of the action
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

// --- 2. Add Poses To Video ---

// Trigger `ManageVideo.addPosesToVideo` when a request comes in
export const RequestAddPosesToVideo: Sync = ({
  request,
  session,
  video: videoId, // Use 'videoId' as a variable name for clarity
  poseData,
  matchingFrames,
  user, // Variable to hold the caller's ID
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/addPosesToVideo", session, video: videoId, poseData, matchingFrames },
    { request },
  ]),
  where: async (frames) => {
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    return frames;
  },
  then: actions([
    ManageVideo.addPosesToVideo,
    { video: videoId, poseData, caller: user, matchingFrames },
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

// --- 3. Retrieve Video Metadata ---

// Trigger `ManageVideo.retrieve` when a request comes in
export const RequestRetrieveVideo: Sync = ({ request, session, video: videoId, user }) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/retrieve", session, video: videoId },
    { request },
  ]),
  where: async (frames) => {
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    return frames;
  },
  then: actions([
    ManageVideo.retrieve,
    { video: videoId, caller: user },
  ]),
});

// Respond to client on successful video metadata retrieval
export const RetrieveVideoResponseSuccess: Sync = ({
  request,
  videoId, // Matches the 'videoId' output parameter from the action
  videoType,
  gcsUrl,
  videoName,
  referenceVideoId,
  feedback,
  poseData,
  matchingFrames,
}) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/retrieve" }, { request }],
    [ManageVideo.retrieve, {}, { // Matching on the specific output parameters
      videoId,
      videoType,
      gcsUrl,
      videoName,
      referenceVideoId,
      feedback,
      poseData,
      matchingFrames,
    }],
  ),
  then: actions([
    Requesting.respond,
    {
      request,
      videoId, // Respond with 'videoId' as the key, and other fields
      videoType,
      gcsUrl,
      videoName,
      referenceVideoId,
      feedback,
      poseData,
      matchingFrames,
    },
  ]),
});

// Respond to client on error during video metadata retrieval
export const RetrieveVideoResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/retrieve" }, { request }],
    [ManageVideo.retrieve, {}, { error }],
  ),
  then: respondError(request, error),
});

// --- 4. Stream Video ---
// IMPORTANT: The `ManageVideo.streamVideo` concept action is specified to return a raw `Response` object.
// The `Requesting.respond` mechanism is designed for JSON responses.
//
// For this synchronization to work as intended, we assume `ManageVideo.streamVideo` is modified to
// return a *stream URL* (e.g., a Google Cloud Storage signed URL) in a JSON object,
// rather than directly streaming the HTTP response.
//
// If `ManageVideo.streamVideo` strictly returns a `Response` object, you would typically:
//   a) Exclude "/ManageVideo/streamVideo" from Requesting's auto-passthrough routes in `passthrough.ts`.
//   b) Implement a custom Deno HTTP route outside the sync system to handle the streaming directly.

// Trigger `ManageVideo.streamVideo` (assuming it returns a URL)
export const RequestStreamVideo: Sync = ({ request, session, video: videoId, user }) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/streamVideo", session, video: videoId },
    { request },
  ]),
  where: async (frames) => {
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    return frames;
  },
  then: actions([
    ManageVideo.streamVideo,
    { video: videoId, caller: user },
  ]),
});

// Respond with the stream URL (if action returns `{ streamUrl: string }`)
export const StreamVideoResponseSuccess: Sync = ({ request, streamUrl }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/streamVideo" }, { request }],
    [ManageVideo.streamVideo, {}, { streamUrl }],
  ),
  then: actions([Requesting.respond, { request, streamUrl }]),
});

// Respond on error during stream URL generation
export const StreamVideoResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/streamVideo" }, { request }],
    [ManageVideo.streamVideo, {}, { error }],
  ),
  then: respondError(request, error),
});

// --- 5. Delete Video ---

// Trigger `ManageVideo.delete` when a request comes in
export const RequestDeleteVideo: Sync = ({ request, session, video: videoId, user }) => ({
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

// --- 6. Set Matching Frames ---

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
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    return frames;
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
    [Requesting.request, { path: "/ManageVideo/setMatchingFrames" }, { request }],
    [ManageVideo.setMatchingFrames, {}, {}],
  ),
  then: respondSuccess(request),
});

// Respond to client on error during matching frames update
export const SetMatchingFramesResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/ManageVideo/setMatchingFrames" }, { request }],
    [ManageVideo.setMatchingFrames, {}, { error }],
  ),
  then: respondError(request, error),
});

// --- 7. Store Feedback ---

// Trigger `ManageVideo.storeFeedback` when a request comes in
export const RequestStoreFeedback: Sync = ({ request, session, video: videoId, feedbackId, user }) => ({
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

// --- 8. Get Practice Videos (Query) ---

// Handle request for practice videos associated with a reference video
export const RequestGetPracticeVideos: Sync = ({
  request,
  session,
  referenceVideoId,
  user, // For session authorization
  video, // Variable for individual video results from the query
  results, // Variable to hold the collected array of video documents
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/getPracticeVideos", session, referenceVideoId },
    { request },
  ]),
  where: async (frames) => {
    const originalFrame = frames[0]; // Capture original request context for responding
    frames = await frames.query(Sessioning._getUser, { session }, { user }); // Authorize
    frames = await frames.query(ManageVideo._getPracticeVideos, { referenceVideoId }, { video }); // Run the query

    if (frames.length === 0) {
      // If no videos are found, ensure a response is sent with an empty array
      return new Frames({ ...originalFrame, [results]: [] });
    }

    // Collect all individual 'video' bindings into a single 'results' array
    return frames.collectAs([video], results);
  },
  then: actions([Requesting.respond, { request, results }]),
});

// --- 9. Get All Reference Videos (Query) ---

// Handle request for all reference videos owned by the caller
export const RequestGetAllReferenceVideos: Sync = ({
  request,
  session,
  user, // For session authorization and as caller for the query
  video, // Variable for individual video results from the query
  results, // Variable to hold the collected array of video documents
}) => ({
  when: actions([
    Requesting.request,
    { path: "/ManageVideo/getAllReferenceVideos", session },
    { request },
  ]),
  where: async (frames) => {
    const originalFrame = frames[0]; // Capture original request context for responding
    frames = await frames.query(Sessioning._getUser, { session }, { user }); // Authorize
    frames = await frames.query(ManageVideo._getAllReferenceVideos, { caller: user }, { video }); // Run the query

    if (frames.length === 0) {
      // If no videos are found, ensure a response is sent with an empty array
      return new Frames({ ...originalFrame, [results]: [] });
    }

    // Collect all individual 'video' bindings into a single 'results' array
    return frames.collectAs([video], results);
  },
  then: actions([Requesting.respond, { request, results }]),
});

```
