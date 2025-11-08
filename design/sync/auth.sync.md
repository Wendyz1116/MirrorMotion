# Auth Synchronizations

**concepts:** `Requesting`, `User`, `Sessioning`

These synchronizations describe a basic flow involving API requests, a standard
username/password based authentication, and a simple notion of sessions.

```sync
//-- User Login & Session Creation (Composite Action) --//
sync LoginRequest
when
    Requesting.request (path: "/login", username, password): (request)
then
    UserAuthentication.login (username, password)

sync LoginSuccessCreatesSession
when
    UserAuthentication.login (): (user)
then
    Sessioning.create (user)

sync LoginResponseSuccess
when
    Requesting.request (path: "/login"): (request)
    // We match on the login success and the subsequent session creation it caused
    UserAuthentication.login (): (user)
    Sessioning.create (user): (session)
then
    Requesting.respond (request, session)

sync LoginResponseError
when
    Requesting.request (path: "/login"): (request)
    UserAuthentication.login (): (error)
then
    Requesting.respond (request, error)

//-- User Logout --//
sync LogoutRequest
when
    Requesting.request (path: "/logout", session): (request)
where
    // Authorize the request: a valid session must exist
    in Sessioning: _getUser(session) gets user
then
    Sessioning.delete (session)
```

# file: src/syncs/auth.sync.ts

```typescript
import { actions, Sync } from "@engine";
import { Requesting, Sessioning, User } from "@concepts";

//-- User Login & Session Creation (Composite Action) --//

export const LoginRequest: Sync = ({ request, username, password }) => ({
  when: actions([
    Requesting.request,
    { path: "/login", username, password },
    { request },
  ]),
  then: actions([User.login, { username, password }]),
});

// When a login is successful, automatically create a session for that user.
export const LoginSuccessCreatesSession: Sync = ({ user }) => ({
  when: actions([User.login, {}, { user }]),
  then: actions([Sessioning.create, { user }]),
});

// Once the session is created, respond to the original login request with the session ID.
export const LoginResponseSuccess: Sync = ({ request, user, session }) => ({
  when: actions(
    [Requesting.request, { path: "/login" }, { request }],
    [UserAuthentication.login, {}, { user }],
    // This action was caused by the login action above.
    [Sessioning.create, { user }, { session }],
  ),
  then: actions([Requesting.respond, { request, session }]),
});

export const LoginResponseError: Sync = ({ request, error }) => ({
  when: actions(
    [Requesting.request, { path: "/login" }, { request }],
    [UserAuthentication.login, {}, { error }],
  ),
  then: actions([Requesting.respond, { request, error }]),
});

//-- User Logout --//

export const LogoutRequest: Sync = ({ request, session, user }) => ({
  when: actions([
    Requesting.request,
    { path: "/logout", session },
    { request },
  ]),
  where: (frames) => {
    // Authorize the request: a valid session must exist.
    // The 'user' is bound but not used in 'then', just for validation.
    return frames.query(Sessioning._getUser, { session }, { user });
  },
  then: actions([Sessioning.delete, { session }]),
});
```
