# Assignment 12 (PR-12)
PR-12 is a first attempt for a simple “Places” instagram-like client and API. You’ll need NPM and IDE to use it.

Project contains two build configurations:
- `npm run dev` starts in hot-reload mode
- `npm run start` start without hot-reload

All builds default to `http://localhost:3000/`.

## Places API description:
- `/users` returns ALL users
- `/users/{id}` returns SINGLE users by ID
- `/cards' returns ALL cards

Release notes for `0.2.0`:
- client (from PR-11) still connected to Yandex.Praktikum API instead of ours
- local API is hardwired to json data-stubs
