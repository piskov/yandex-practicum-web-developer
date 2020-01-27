# Assignment 14 (PR-14)
PR-14 is the third attempt for a simple “Places” instagram-like API. You’ll need NPM, MongoDB, and IDE to use it.

Project contains two build configurations:
- `npm run dev` starts in hot-reload mode
- `npm run start` start without hot-reload

`.env` file is configured to store the production JWT sign key.

All builds default to `http://localhost:3000/` and `mongodb://localhost:27017/mestodb`.

## Places API description:
- `POST /signup` creates new user with `{ name, about, avatar, email, password }`
- `POST /signin` with `{ email, password }` — return http-only 7-day cookie with JWT
- `GET /users` returns ALL users
- `GET /users/{id}` returns SINGLE user by ID
- `GET /cards` returns ALL cards
- `DELETE /cards/{id}` deletes card by ID (if user owns the card)
- `POST /cards` creates new card with `{ name, link }`

## Release notes for `0.4.0`:
- local API is now configured for http-only cookies with JWT instead of hardcoded user id
- two new methods available: `/signup` and `/signin`
- `DELETE /cards/{id}` now deletes the card only if it was created by the same user
-`.env` file is configured to store the production JWT sign key.
