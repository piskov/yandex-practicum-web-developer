# Yandex web developer course
This repo contains homeworks (work assignments) from the Yandex Web developer course.

Each folder represents complete singular assignment.


## Assignments 1…10
For PR-1…10 no additional tools are required (no sass, npm, etc.) — just open in your editor of choice.

## Assignment 11 (PR-11)
PR-11 is a simple instagram-like client for Places API. You’ll need NPM and IDE to use it.

You can check the live version at [github pages](https://piskov.github.io/yandex-web-developer/PR-11/)

Project contains two usual build configurations:
- `npm run dev` for local debug
- `npm run build` for production build

Latest version `0.1.0`:
- moved to webpack
- rewrite to js modules


## Assignment 12 (PR-12)
PR-12 is the first attempt for a simple “Places” instagram-like client and API. You’ll need NPM and IDE to use it.

Project contains two build configurations:
- `npm run dev` starts in hot-reload mode
- `npm run start` start without hot-reload

All builds default to `http://localhost:3000/`.

Places API description:
- `/users` returns ALL users
- `/users/{id}` returns SINGLE users by ID
- `/cards` returns ALL cards

Release notes for `0.2.0`:
- client (from PR-11) still connected to Yandex.Praktikum API instead of ours
- local API is hardwired to json data-stubs


## Assignment 13 (PR-13)
PR-13 is the second attempt for a simple “Places” instagram-like API. You’ll need NPM, MongoDB, and IDE to use it.

Project contains two build configurations:
- `npm run dev` starts in hot-reload mode
- `npm run start` start without hot-reload

All builds default to `http://localhost:3000/` and `mongodb://localhost:27017/mestodb`.

Places API description:
- `GET /users` returns ALL users
- `GET /users/{id}` returns SINGLE user by ID
- `POST /users` creates new user with `{ name, about, avatar }`
- `GET /cards` returns ALL cards
- `DELETE /cards/{id}` deletes card by ID
- `POST /cards` creates new card with `{ name, link }`

Release notes for `0.3.0`:
- local API is now connected to MongoDb instead of hardwired json data-stubs
- front-end client code (from PR-11) hosting is removed from API
