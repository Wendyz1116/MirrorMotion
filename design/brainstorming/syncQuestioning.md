[@syncBackground](../tools/sync-background.md)

[@exampleOfGoodSync](../../src/syncs/video.sync.ts)

[@sampleAuthSync](../sync/auth.sync.md)

[@feedbackConcept](../concepts/MirrorMotionConcepts/Feedback/FeedbackSpecs.md)

# prompt: Given the sync background and the sample sync for files and the sample auth sync can you write ups something like sampleAuthSync for manageVideoConcept?

# response:

The provided `video.sync.ts` file already contains a comprehensive set of synchronizations for the `ManageVideo` concept, demonstrating how it interacts with the `Requesting` and `Sessioning` concepts. It serves as an excellent example of how to wire up a concept's functionality to API requests, including authorization and response handling.

Below, I'll first provide an **overview of the patterns and best practices demonstrated in `video.sync.ts`**, drawing parallels to the `auth.sync.ts` example. Then, I will **propose new synchronizations for the `Feedback` concept**, following these established patterns.

---

## Overview of `ManageVideo` Synchronizations (`video.sync.ts`)

The `video.sync.ts` file effectively orchestrates the `ManageVideo` concept's actions and queries by synchronizing them with `Requesting` for incoming API calls and `Sessioning` for user authentication and authorization.

### 1. Request-Action-Response Cycle

The most fundamental pattern demonstrated is the three-part synchronization cycle for each user-facing action:

*   **`Request<ActionName>`**: A sync that `when` a `Requesting.request` for a specific path occurs, `then` it triggers the corresponding `ManageVideo.<actionName>` action.
    *   **Example**: `RequestUploadVideo` listens for `Requesting.request` on `/ManageVideo/upload` and triggers `ManageVideo.upload`.
*   **`<ActionName>ResponseSuccess`**: A sync that `when` both the `Requesting.request` (from the same flow) and the `ManageVideo.<actionName>` (succeeding with a non-error return) occur, `then` it triggers `Requesting.respond` with the successful result.
    *   **Example**: `UploadVideoResponseSuccess` waits for the `/ManageVideo/upload` request and a successful `ManageVideo.upload` action, then responds with the `video` ID.
*   **`<ActionName>ResponseError`**: A sync that `when` both the `Requesting.request` and the `ManageVideo.<actionName>` (failing with an `error` return) occur, `then` it triggers `Requesting.respond` with the error message.
    *   **Example**: `UploadVideoResponseError` handles the same request path but responds with an `error` if `ManageVideo.upload` returns one.

This separation of concerns allows for clear error handling and ensures that the API response directly reflects the outcome of the concept's action.

### 2. Authorization via `Sessioning`

Almost all `ManageVideo` synchronizations that modify or retrieve user-specific data include an authorization step:

*   The `where` clause uses `frames.query(Sessioning._getUser, { session }, { user })` to validate the `session` ID provided in the incoming request and bind the `user` (caller) ID to the frame.
*   If `frames.length === 0` after the `Sessioning._getUser` query, it indicates an invalid session, and the sync typically returns an error frame (e.g., `new Frames({ [request]: { error: "Invalid session" } })`) to prevent unauthorized actions.
*   The bound `user` variable is then passed as the `owner` or `caller` argument to the `ManageVideo` actions, allowing the concept itself to perform internal authorization checks (e.g., "is this user the owner of this video?").

### 3. Handling Request Payload & Data Extraction

*   **Direct Argument Passing**: For simple string or number parameters (like `videoType`, `videoName`), the `when` clause's pattern matching directly binds these to symbols, which are then passed to the `then` clause.
*   **Complex Data (e.g., Files, PoseData)**: For binary data (`file`) or structured JSON objects (`poseData` for `addPosesToVideo`), the logic within the `where` clause explicitly extracts these from the `frames[0]` (the original `Requesting.request` frame).
    *   **Example (`RequestUploadVideo`)**: `const actualFile = requestFrame.file;` directly accesses the `file` property from the `requestFrame`. This extracted value is then bound to a symbol (e.g., `fileData`) and passed to the `ManageVideo.upload` action.
    *   **Example (`RequestAddPosesToVideo`, `RequestSetMatchingFrames`)**: These also explicitly extract and re-bind values like `actualVideoId`, `actualPoseData`, `actualReferenceStartFrame` from `requestFrame`. While some of these might be implicitly carried by symbols, this explicit extraction and re-binding ensure all necessary parameters are available for the `then` clause and for debugging.

### 4. Query Synchronizations

Queries (`_retrieve`, `_getPracticeVideos`, `_getAllReferenceVideos`) follow a slightly different pattern for responses:

*   The `Request<QueryName>` sync handles the incoming `Requesting.request`.
*   The `where` clause performs authorization (using `Sessioning._getUser`).
*   Instead of triggering another concept action in `then`, the `where` clause **directly invokes the concept's query method** (e.g., `await ManageVideo._retrieve(...)`).
*   The result of the query (a single object or an array of objects) is then **manually bound to a new symbol** in the `frames` (e.g., `[result]: videoDoc` or `[results]: videoDocs`).
*   The `then` clause then simply calls `Requesting.respond` with this result symbol.
*   **Error Handling**: Queries typically wrap the direct concept method call in a `try-catch` block, returning an error frame if the query fails.
*   **`collectAs` Helper**: `RequestGetActiveUserPurchaseTotals` in the general documentation uses `collectAs` to group multiple results into a single array for the response, which is a powerful pattern for aggregating query results. The `ManageVideo` query syncs directly return the queried arrays.

### 5. Helper Functions

The `video.sync.ts` file uses simple helper functions (`respondSuccess`, `respondError`) to make the `then` clauses more concise and readable, especially for common response patterns.

---

## Synchronizations for the `Feedback` Concept

Now, let's apply these patterns to the `Feedback` concept. The `Feedback` concept's core action is `analyze`, which requires `poseData` from `ManageVideo` videos. We'll also provide syncs for its queries.

**Assumption**: The `ManageVideo` concept has a query `_getPoseData(video: Video, caller: User): (poseData: PoseData[][])` to retrieve the pose data for a given video, respecting caller authorization. This is necessary because `Feedback.analyze` expects pose data directly, not video IDs.

### 1. `src/syncs/feedback.sync.ts`

```typescript
import { actions, Frames, Sync } from "@engine";
import { Requesting, Sessioning, Feedback, ManageVideo } from "@concepts"; 
// Ensure Feedback and ManageVideo are correctly imported from their respective concept files

// Helper for success response with a generic "status: success"
const respondSuccess = (request: symbol) =>
  actions([Requesting.respond, { request, status: "success" }]);

// Helper for error response
const respondError = (request: symbol, error: symbol) =>
  actions([Requesting.respond, { request, error }]);

// --- Analyze Feedback (Action) ---
// Purpose: Trigger Feedback.analyze based on a request, fetching pose data from ManageVideo first.

export const RequestAnalyzeFeedback: Sync = ({
  request,
  session,
  referenceVideoId,
  practiceVideoId,
  user, // Bound by Sessioning._getUser
  referencePoseData, // Symbol to bind the retrieved reference video's pose data
  practicePoseData,  // Symbol to bind the retrieved practice video's pose data
}) => ({
  when: actions([
    Requesting.request,
    {
      path: "/Feedback/analyze",
      session,
      referenceVideoId,
      practiceVideoId,
    },
    { request },
  ]),
  where: async (frames) => {
    const originalRequestFrame = frames[0]; // Keep a reference to the initial request frame

    // 1. Authorize the user session
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    if (frames.length === 0) {
      return new Frames({ ...originalRequestFrame, error: "Invalid session" });
    }
    const userFrame = frames[0];
    const userId = userFrame[user];

    // 2. Retrieve pose data for the reference video using ManageVideo._getPoseData
    let currentFrames = new Frames({ ...userFrame }); // Start with the user-authorized frame
    try {
      currentFrames = await currentFrames.query(
        ManageVideo._getPoseData,
        { video: referenceVideoId, caller: userId },
        { poseData: referencePoseData }, // Bind output poseData to the referencePoseData symbol
      );
    } catch (e) {
      return new Frames({ ...originalRequestFrame, error: `Failed to retrieve reference video pose data: ${e.message}` });
    }
    if (currentFrames.length === 0 || !currentFrames[0][referencePoseData]) {
      return new Frames({ ...originalRequestFrame, error: "Reference video pose data not found or unauthorized." });
    }
    const frameWithReferencePose = currentFrames[0];

    // 3. Retrieve pose data for the practice video using ManageVideo._getPoseData
    currentFrames = new Frames({ ...frameWithReferencePose }); // Continue the frame chain
    try {
      currentFrames = await currentFrames.query(
        ManageVideo._getPoseData,
        { video: practiceVideoId, caller: userId },
        { poseData: practicePoseData }, // Bind output poseData to the practicePoseData symbol
      );
    } catch (e) {
      return new Frames({ ...originalRequestFrame, error: `Failed to retrieve practice video pose data: ${e.message}` });
    }
    if (currentFrames.length === 0 || !currentFrames[0][practicePoseData]) {
      return new Frames({ ...originalRequestFrame, error: "Practice video pose data not found or unauthorized." });
    }

    // The final frame now contains 'request', 'session', 'referenceVideoId', 'practiceVideoId',
    // 'user', 'referencePoseData', and 'practicePoseData'
    return currentFrames;
  },
  then: actions([
    Feedback.analyze,
    {
      referenceVideoId,
      practiceVideoId,
      referencePoseData, // Use the bound symbol
      practicePoseData,  // Use the bound symbol
    },
  ]),
});

// Purpose: Respond to the client upon successful feedback analysis.
export const AnalyzeFeedbackResponseSuccess: Sync = ({
  request,
  feedbackID,
  feedbackText,
}) => ({
  when: actions(
    [Requesting.request, { path: "/Feedback/analyze" }, { request }],
    [Feedback.analyze, {}, { feedbackID, feedbackText }],
  ),
  then: actions([Requesting.respond, { request, feedbackID, feedbackText }]),
});

// Purpose: Respond to the client upon error during feedback analysis.
export const AnalyzeFeedbackResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/Feedback/analyze" }, { request }],
    [Feedback.analyze, {}, { error }],
  ),
  then: respondError(request, error),
});

// --- Get Feedback (Query) ---
// Purpose: Handle requests to retrieve feedback details by ID.

export const RequestGetFeedback: Sync = ({
  request,
  session,
  feedbackID,
  user,
  feedbackText,    // Symbol to bind feedback text from query
  accuracyValue,   // Symbol to bind accuracy value from query
}) => ({
  when: actions([
    Requesting.request,
    { path: "/Feedback/_getFeedback", session, feedbackID },
    { request },
  ]),
  where: async (frames) => {
    const originalRequestFrame = frames[0];

    // 1. Authorize user session
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    if (frames.length === 0) {
      return new Frames({ ...originalRequestFrame, error: "Invalid session" });
    }
    const userFrame = frames[0];
    // Note: Feedback._getFeedback's spec does not list 'caller', so we don't pass 'userId' to it directly.
    // Authorization is handled at the sync level by Sessioning.

    // 2. Directly call the query and bind results
    try {
      const feedbackResult = await Feedback._getFeedback({ feedbackID });

      // Assuming feedbackResult is { feedbackText: string, accuracyValue: number }
      return new Frames({
        ...userFrame,
        [feedbackText]: feedbackResult.feedbackText,
        [accuracyValue]: feedbackResult.accuracyValue,
      });
    } catch (e) {
      return new Frames({ ...originalRequestFrame, error: `Error retrieving feedback: ${e.message}` });
    }
  },
  then: actions([Requesting.respond, { request, feedbackText, accuracyValue }]),
});

// --- Find Feedback (Query) ---
// Purpose: Handle requests to find a feedback record by reference and practice video IDs.

export const RequestFindFeedback: Sync = ({
  request,
  session,
  referenceVideoId,
  practiceVideoId,
  user,
  feedbackDoc, // Symbol to bind the full feedback document from query
}) => ({
  when: actions([
    Requesting.request,
    { path: "/Feedback/_findFeedback", session, referenceVideoId, practiceVideoId },
    { request },
  ]),
  where: async (frames) => {
    const originalRequestFrame = frames[0];

    // 1. Authorize user session
    frames = await frames.query(Sessioning._getUser, { session }, { user });
    if (frames.length === 0) {
      return new Frames({ ...originalRequestFrame, error: "Invalid session" });
    }
    const userFrame = frames[0];
    // Authorization via Sessioning._getUser is sufficient here.

    // 2. Directly call the query and bind results
    try {
      const feedbackResult = await Feedback._findFeedback({
        referenceVideoId,
        practiceVideoId,
      });

      // Assuming feedbackResult is the full FeedbackRecord
      return new Frames({ ...userFrame, [feedbackDoc]: feedbackResult });
    } catch (e) {
      return new Frames({ ...originalRequestFrame, error: `Error finding feedback: ${e.message}` });
    }
  },
  then: actions([Requesting.respond, { request, feedbackDoc }]),
});
```

### 2. Required `ManageVideo` Query (Assumption)

For the `Feedback.analyze` syncs to function, the `ManageVideo` concept would need to expose a query to retrieve pose data. Here's how that might be specified:

```concept
// --- Inside src/concepts/ManageVideo/ManageVideoConcept.ts ---

// Assuming PoseData is a defined type in your system (e.g., an array of objects)
type PoseData = any; // Or a more specific interface

// ... (other ManageVideo actions/queries)

queries
  _getPoseData (video: Video, caller: User): (poseData: PoseData[][])
    **requires** video with 'video' exists and 'caller' is authorized to access its pose data.
    **effects** returns the stored pose data (array of arrays of PoseData) for the specified video.
    **error** returns an error string if the video is not found or the caller is not authorized.
```

And its implementation in `ManageVideoConcept.ts` would involve querying the video collection for the `poseData` field, after validating `caller` access.

### Summary

These `feedback.sync.ts` synchronizations integrate the `Feedback` concept into the application's request-driven architecture. They demonstrate how to:
1.  **Chain concept interactions**: `Requesting` triggers `Sessioning` (for auth), `Sessioning` results enable `ManageVideo` queries (to fetch pose data), and these query results then feed into `Feedback.analyze`.
2.  **Handle complex data flows**: By using symbols to carry structured data (`referencePoseData`, `practicePoseData`) across `where` clauses, allowing them to be retrieved and passed to the target concept action.
3.  **Maintain consistency**: Following the established `Request<Action/Query>`, `ResponseSuccess`, and `ResponseError` patterns for robust API design.