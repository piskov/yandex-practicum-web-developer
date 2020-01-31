# Assignment 15 (PR-15)
PR-15 is the forth and final attempt for a simple “Places” instagram-like API. You’ll need NPM, MongoDB, and IDE to use it.

Project contains two build configurations:
- `npm run dev` starts in hot-reload mode
- `npm run start` start without hot-reload

`.env` file is configured to store the production JWT sign key.

All builds default to `http://localhost:3000/` and `mongodb://localhost:27017/mestodb`.

Production API is at: https://api.divulge-uncommon.ru

## Places API description:
- `POST /signup` creates new user with `{ name, about, avatar, email, password }`
- `POST /signin` with `{ email, password }` — return http-only 7-day cookie with JWT
- `GET /users` returns ALL users
- `GET /users/{id}` returns SINGLE user by ID
- `GET /cards` returns ALL cards
- `DELETE /cards/{id}` deletes card by ID (if user owns the card)
- `POST /cards` creates new card with `{ name, link }`

## Release notes for `1.0.0`:
- Winston logging at `error.log` and `request.log`
- request parameters and body validation using Celebrate
- centralized error handling
