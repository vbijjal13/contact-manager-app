# Contact Manager App

A contact manager built with Next.js App Router, React, TypeScript, and Tailwind CSS. Users can register, sign in, and manage a personal list of contacts through a small CRUD API backed by `json-server`.

## What The App Does

- Landing page with product overview and FAQ
- User registration and login
- Cookie-based session handling
- Personal contact list per user
- Add, edit, copy, and delete contact records
- Form validation for email and password fields

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Axios
- `json-server`
- Vitest

## How It Works

The app uses two layers locally:

1. The Next.js app runs on `http://localhost:3000`
2. A `json-server` instance runs on `http://localhost:3001` and stores data in [`src/app/_data/db.json`](/d:/Vikas%20Projects/contact-manager-app/src/app/_data/db.json)

Runtime flow:

- The UI calls Next API routes such as `/api/login`, `/api/register`, and `/api/contacts`
- Those API routes proxy requests to `json-server`
- Login and registration set a `user` cookie
- The contacts page reads that cookie on the server and fetches contacts for the current user

## Local Development

Install dependencies:

```bash
npm install
```

Start the mock backend in one terminal:

```bash
npm run server
```

Start the Next.js app in another terminal:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

The repository currently includes `.env.local` and `.env.production`, but the values in those files do not match the runtime code. For local development, use values like these:

```env
API_URL=http://localhost:3001
CONTACTS_API_URL=http://localhost:3000/api/contacts
LOGIN_URL=/api/login
REGISTER_URL=/api/register
```

Notes:

- `API_URL` is used by Next API routes to talk to `json-server`
- `CONTACTS_API_URL` is used by the contact service
- `LOGIN_URL` is used by the login form
- `REGISTER_URL` is defined in env files but is not currently used in the code

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
npm run server
```

## Tests

The current test suite covers the validator helpers in [`test/validators.test.ts`](./test/validators.test.ts).

In this workspace session, `npm test -- --run` failed with a Windows `spawn EPERM` error, so the suite could not be fully verified here.

## API Reference

The contacts API is documented in [`CONTACT_API.md`](./CONTACT_API.md).

Available routes:

- `POST /api/register`
- `POST /api/login`
- `GET /api/contacts?userId=...`
- `POST /api/contacts`
- `PUT /api/contacts/[id]`
- `DELETE /api/contacts/[id]?userId=...`

## Project Structure

```text
src/app/
  _components/   UI components and modals
  _data/         json-server database
  _lib/          session, validation, and contact service helpers
  _types/        shared TypeScript types
  api/           Next API routes
  contact/       authenticated contacts page
  login/         login page
  register/      registration page
```

## Deployment Caveat

The repo is currently configured with `output: "export"` in [`next.config.ts`](./next.config.ts) and a GitHub Pages workflow in [`.github/workflows/nextjs.yml`](./.github/workflows/nextjs.yml).

That setup conflicts with the current application design because this app depends on:

- Next API routes
- server-side cookie access
- a running backend data source

A static export to GitHub Pages will not provide those server capabilities. To deploy the full app as written, use a platform that supports Next.js server features, or move auth/contact storage to an external backend and make the frontend fully static.

## Seed Data

Sample users and contacts live in [`db.json`](./src/app/_data/db.json). `json-server` updates that file directly while the mock backend is running.
