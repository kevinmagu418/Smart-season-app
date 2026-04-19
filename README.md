# SmartSeason Field Monitoring System

This is a production-quality full-stack web application designed for agricultural field monitoring.

## Setup Instructions

This project uses `npm` workspaces. Ensure you have Node.js 18+ installed.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Database Setup:**
   - Run a PostgreSQL or Supabase instance.
   - Copy `.env.example` to `.env` in the root (which the `api` app will read if you load it, or place it directly in `apps/api/.env`). 
   - Configure `DATABASE_URL` appropriately in `apps/api/.env`.
   - Run migrations: `cd apps/api && npm run db:push`

3. **Start the applications:**
   From the root folder, run:
   ```bash
   npm run dev
   ```
   This will start both:
   - Next.js frontend on http://localhost:3000
   - Express backend on http://localhost:4000

## Architecture Decisions

- **Monorepo setup:** Managed using npm workspaces to easily share types between frontend and backend via `@smartseason/types`.
- **Frontend:** Next.js App Router for simplified file-based routing and Server Components when needed. Uses Material UI for simple, clean design. Context API is used for predictable client-side auth state.
- **Backend:** Express with TypeScript ensures a typed REST API. Prisma ORM handles PostgreSQL database models with strict typing matching the frontend.
- **Controllers/Services pattern:** Express routes map to thin controllers, keeping business logic strictly inside the `services` layer, allowing reusability and isolated testing.

## Computed Field Status Logic

A critical feature is computing field status (`utils/status.ts`):
- **Completed:** Stage is strictly `HARVESTED`
- **At Risk:** No field updates in the last 7 days OR the field is stuck in the `PLANTED` phase for more than 14 days without advancing.
- **Active:** Any field that is currently `PLANTED`, `GROWING`, or `READY` and not triggering an "At Risk" condition.
