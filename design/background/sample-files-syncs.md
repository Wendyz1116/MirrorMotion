import { actions, Frames, Sync } from "@engine";
import { Requesting, Sessioning, FileUploading, Sharing, UserAuthentication } from "@concepts";

//-- Phase 1: Request Upload URL --//
export const RequestUploadURL: Sync = ({ request, session, filename, user }) => ({
  when: actions([Requesting.request, { path: "/FileUploading/requestUploadURL", session, filename }, { request }]),
  where: async (frames) => {
    frames = await frames.query(Sessioning._getUser, { session }, { user })
    return frames
  },
  then: actions([FileUploading.requestUploadURL, { owner: user, filename }]),
});