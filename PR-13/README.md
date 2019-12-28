# Assignment 13 (PR-13)
PR-13 is the second attempt for a simple “Places” instagram-like API. You’ll need NPM, MongoDB, and IDE to use it.

Project contains two build configurations:
- `npm run dev` starts in hot-reload mode
- `npm run start` start without hot-reload

All builds default to `http://localhost:3000/` and `mongodb://localhost:27017/mestodb`.

## Places API description:
- `GET /users` returns ALL users
- `GET /users/{id}` returns SINGLE user by ID
- `POST /users` creates new user with `{ name, about, avatar }`
- `GET /cards` returns ALL cards
- `DELETE /cards/{id}` deletes card by ID
- `POST /cards` creates new card with `{ name, link }`

## Release notes for `0.3.0`:
- local API is now connected to MongoDb instead of hardwired json data-stubs
- front-end client code (from PR-11) hosting is removed from API
