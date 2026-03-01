# Better Auth starter

A minimal Next.js auth system using **better-auth** with email/password sign up and sign in.

## Features

- Email + password account creation
- Sign in and sign out
- Session-aware home page
- Protected `/dashboard` page (redirects if unauthenticated)
- Next.js API route mounted at `/api/auth/*`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file:

```bash
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DB_NAME
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
```

3. Start the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Notes

- This project uses a PostgreSQL connection via `pg`.
- Make sure your database is reachable from the app.
- If you need migrations/seeding, run them per your better-auth setup.
