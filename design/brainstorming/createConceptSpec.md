# create concept spec
[@currentConceptSpec](../concepts/MirrorMotionConcepts/Feedback/FeedbackSpecs.md)

[@currentConceptCodeImplementationTs](../../src/concepts/Feedback/FeedbackConcept.ts)

[@goodConceptSpecExample](../background/concept-spec-example.md)

# prompt: 
given the update code implementation (at currentConceptCodeImplementationTs can you read this code here? if so also list all the current functions we have), update currentConceptSpec to match what we have in the code. Please keep the state in this kind of format (I already have it in this format, just add onto the state please)

**state**:
*   a set of BLanks with
*   an `name` Type
*   a `name` Type... etc

and make sure to write a new action or query for everything new thing i implement in the code implementation.

goodConceptSpecExample is another good example of what i want the concept spec to look like. Thank you
# response:

Okay, I've reviewed your `FeedbackConcept.ts` code and will update the concept spec to accurately reflect its current implementation.

Here's the list of current functions in your `FeedbackConcept` class:

*   `constructor(private readonly db: Db)`
*   `analyze(...)`
*   `analyzeAngles(...)`
*   `getFeedback(...)`
*   `findFeedback(...)`

---

## Concept: Feedback

**Purpose**: highlight differences between practice video and reference choreography
**Principle**: after a video is broken into different poses, we can generate feedback on different body parts

**State**\
A set of **Feedback** records with:

*   a `feedbackID` String
*   a `referenceVideo` String (ID of the reference video from which pose data was derived)
*   a `practiceVideo` String (ID of the practice video from which pose data was derived)
*   a `feedbackText` String (the generated textual feedback)
*   an `accuracyValue` Number (a numerical score indicating similarity/accuracy, e.g., 0-100)
*   a `frameScores` Array of Numbers (optional: per-frame accuracy scores)
*   a `worstFrames` Array of Numbers (optional: indices of frames with the lowest scores)

**Actions**

*   `analyze(referenceVideoId: String, practiceVideoId: String, referencePoseData: PoseData[][], practicePoseData: PoseData[][]): (feedbackID: String, feedbackText: String)`
    *   Requires: `referenceVideoId` and `practiceVideoId` refer to existing videos; `referencePoseData` and `practicePoseData` (arrays of pose frames with landmark coordinates) are provided.
    *   Effect: Compares practice `PoseData` to reference `PoseData` based on landmark distances, creates a new feedback record including overall accuracy, per-frame scores, and worst frames, and stores it. Returns the new feedback record's ID and the generated feedback text.
    *   Error: Returns an error string if pose data parsing or validation fails.

*   `analyzeAngles(referenceVideoId: String, practiceVideoId: String, referencePoseData: PoseData[][], practicePoseData: PoseData[][]): (feedbackID: String, feedbackText: String)`
    *   Requires: `referenceVideoId` and `practiceVideoId` refer to existing videos; `referencePoseData` and `practicePoseData` (arrays of pose frames with landmark coordinates) are provided.
    *   Effect: Compares practice `PoseData` to reference `PoseData` based on joint angles, creates a new feedback record including overall accuracy, per-frame scores, and worst frames, and stores it. Returns the new feedback record's ID and the generated feedback text.
    *   Error: Returns an error string if pose data parsing or validation fails.

**Queries**

*   `getFeedback(feedbackID: String): (feedbackText: String, accuracyValue: Number)`
    *   Requires: A feedback record with the given `feedbackID` exists.
    *   Effect: Returns the `feedbackText` and `accuracyValue` of the specified feedback record.
    *   Error: Returns an error string if the feedback record is not found.

*   `findFeedback(referenceVideoId: String, practiceVideoId: String): (feedbackDoc: FeedbackRecord)`
    *   Requires: A feedback record exists that matches both `referenceVideoId` and `practiceVideoId`.
    *   Effect: Returns the full feedback document (`feedbackDoc`) for the given pair of video IDs.
    *   Error: Returns an error string if no matching feedback record is found or a database error occurs.