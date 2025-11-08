# MirrorMotion Final Design Document

## Summary
MirrorMotion evolved from a complex dance learning platform into a more straightforward, focused application with modular concept architecture and clearly defined backend syncs that ensure security and consistency. By moving all sync logic to the server side, the application prevents client-side manipulation of the individual API calls while maintaining organized, systematic patterns for API interactions. The final implementation prioritizes core functionality over complex features, resulting in a more secure and user-friendly experience.

## Major Concept Changes from Assignment 2
**Removed Concepts:**
- **ProgressTracker**: Originally intended to log user sessions and track improvement over time. Practice tracking is now handled by just examining videos associated with specific users and reference videos, maintaining better separation of concerns.

**Retained and Enhanced Concepts:**
- **ManageVideo**: Handles reference and practice video storage, pose data integration, and video streaming. Added MatchingFrames to synchronize video playback so reference and practice videos start at the same audio segment for accurate comparison.
- **Feedback**: Allows users to track their feedback and improvement over time
- **User**: Simplified authentication system

**Added Concepts:**
- **Sessioning**: Supports sync framework and separates user registration from active user sessions, enabling more secure session management.

## Technical Architecture Decisions
- **Google Cloud Storage**: Implemented for efficient video file storage and streaming capabilities
- **MediaPipe Integration**: Leveraged Google's MediaPipe for reliable pose detection and landmark extraction
- **Frame Matching System**: Uses audio synchronization to align reference and practice videos for accurate comparison

## New 4c Implementation Insights
### Specialized API Endpoints
- **File Upload**: For ManageVideo/upload, use multipart/form-data instead JSON/base64 input of with direct Google Cloud Storage streaming to resolve "offset out of bounds" errors and handle large video files
- **Video Streaming**: Created dedicated route outside sync framework to return proper video/quicktime content type instead of application/json response for native browser playback

### Sync Framework Patterns
- **Symbol Resolution**: Established consistent pattern of extracting actual values from request frames in `where` clauses to prevent runtime errors when passing data to concept methods

## Visual Design Refinements from Assignment 2
- Maintained core design from Assignment 2 UI sketches while implementing practical improvements
- Updated from Assignment 4b's initial checkoff single-page layout with dual panels to a multi-page structure where each concept has its dedicated interface
- Simplified feedback display prioritizing actionable insights with intelligent "worst frame" detection

## User Flow Optimization
- **Session Management**: Persistent login state connected to sessions rather than users, allowing for more independent session handling
- **Navigation Flow**: Users are routed to appropriate pages after actions (login page after signup, video library after successful upload)
- **Page Organization**: Each concept operates on separate pages for clearer user experience

## Future Implementation

**Streaming Architecture**: Direct cloud storage integration could replace URL-based retrieval to improve memory constraints and upload reliability.

**Potential Enhancements**:
- Automatic feedback generation after upload (currently feedback generation is slow due to audio matching and pose detection processing time, so it was moved to an on-demand button. Future versions could run this processing in the background after upload)
- Frame-by-frame detailed accuracy values and comments building on current per-frame feedback foundation

## Conclusion

The final MirrorMotion implementation successfully delivers on the core promise of intelligent dance instruction through pose analysis while maintaining simplicity and reliability. Starting with fewer, well-defined concepts proved more effective than attempting comprehensive feature coverage. The eliminated ProgressTracker concept, while theoretically valuable, would have complicated the user experience without providing major benefits.

The architectural decisions made throughout development, from concept elimination to incremental backend development transitioning from direct API calls to organized syncs, created a solid foundation for continued application improvement.