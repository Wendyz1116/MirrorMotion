/**
 * The Requesting concept exposes passthrough routes by default,
 * which allow POSTs to the route:
 *
 * /{REQUESTING_BASE_URL}/{Concept name}/{action or query}
 *
 * to passthrough directly to the concept action or query.
 * This is a convenient and natural way to expose concepts to
 * the world, but should only be done intentionally for public
 * actions and queries.
 *
 * This file allows you to explicitly set inclusions and exclusions
 * for passthrough routes:
 * - inclusions: those that you can justify their inclusion
 * - exclusions: those to exclude, using Requesting routes instead
 */

/**
 * INCLUSIONS
 *
 * Each inclusion must include a justification for why you think
 * the passthrough is appropriate (e.g. public query).
 *
 * inclusions = {"route": "justification"}
 */

export const inclusions: Record<string, string> = {
  // User
  "/api/User/register": "allow anyone to register",

  // ManageVideo
  "/api/ManageVideo/streamVideo": "return special video/quicktime content type",
  "/api/ManageVideo/upload": "use special formData for big video files",

  // Feedback
  "/api/Feedback/analyze": "allow pose analysis for uploaded videos",
  "/api/Feedback/getFeedback": "retrieve feedback data for users",
  "/api/Feedback/findFeedback": "query existing feedback records",

  // PoseBreakdown
  "/api/PoseBreakdown/getPoseData":
    "access pose detection results for analysis",

  // Sessioning
  "/api/Sessioning/_getUser": "internal user lookup for session validation",
};

/**
 * EXCLUSIONS
 *
 * Excluded routes fall back to the Requesting concept, and will
 * instead trigger the normal Requesting.request action. As this
 * is the intended behavior, no justification is necessary.
 *
 * exclusions = ["route"]
 */

export const exclusions: Array<string> = [
  // ManageVideo
  "/api/ManageVideo/delete",
  "/api/ManageVideo/setMatchingFrames",
  "/api/ManageVideo/addPosesToVideo",
  "/api/ManageVideo/storeFeedback",
  "/api/ManageVideo/_retrieve",
  "/api/ManageVideo/_getAllReferenceVideos",
  "/api/ManageVideo/_getPracticeVideos",

  // User
  "/api/User/login",
  "/api/logout",

  // Sessioning
  "/api/Sessioning/create",
  "/api/Sessioning/delete",
];
