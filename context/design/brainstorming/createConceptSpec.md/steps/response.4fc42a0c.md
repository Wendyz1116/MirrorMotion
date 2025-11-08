---
timestamp: 'Fri Nov 07 2025 16:54:03 GMT-0500 (Eastern Standard Time)'
parent: '[[..\20251107_165403.a21d94bc.md]]'
content_id: 4fc42a0cf228f09630b4e8eb7115c4b7ab8bd54c67f5304a8ae74c828b104480
---

# response:

Here's the updated Concept Specification matching the provided `state` structure, including new actions and queries for the new elements.

## Concept: ManageVideo\[User, Feedback, PoseData]

**Purpose**: allow dancers and choreographers to upload and manage their video files, supporting an asynchronous upload process.
**Principle**: after initiating an upload and completing it, a file can be retrieved by its owner for further use.

**State**\
A set of **Files** with:

* an `owner` User
* a `filename` String
* a `storagePath` String (e.g., the path/key of the object in the GCS bucket), which also serves as the unique identifier for the file entry.
* a `status` String (values: "pending", "uploaded")

**Actions**

* `initiateFileUpload(filename: String, owner: User): (storagePath: String)`
  * Requires: `filename` is provided.
  * Effect: Creates a new `File` entry with the given `filename`, `owner`, and sets its `status` to "pending". Generates a unique `storagePath` (representing the eventual location in external storage) and returns it. This `storagePath` will be used by the client to perform the actual file transfer and subsequent completion.

* `completeFileUpload(storagePath: String, caller: User)`
  * Requires: A `File` entry with the given `storagePath` exists, its `status` is "pending", and the `caller` is the owner of that file entry.
  * Effect: Changes the `status` of the `File` entry associated with `storagePath` from "pending" to "uploaded".

* `retrieveFileInfo(storagePath: String, caller: User): (filename: String, owner: User, status: String)`
  * Requires: A `File` entry with the given `storagePath` exists and the `caller` is the owner of the file.
  * Effect: Returns the `filename`, `owner`, and `status` of the stored file.

* `queryFilesByOwner(caller: User): (files: {filename: String, storagePath: String, status: String}[])`
  * Effect: Returns a list of all `File` entries (each containing `filename`, `storagePath`, and `status`) owned by the `caller`.

* `deleteFile(storagePath: String, caller: User)`
  * Requires: A `File` entry with the given `storagePath` exists and the `caller` is the owner of the file.
  * Effect: Removes the `File` entry and its associated metadata. (This action typically triggers the actual file deletion from external storage as well).
