# SmartSeason Field Monitoring System

SmartSeason is a production-ready, full-stack monorepo application designed for agricultural management. It enables administrators to coordinate field operations and agents to log maintenance and growth updates in real-time.

## 🧱 Project Architecture

This project is organized as a monorepo using npm workspaces:

- **`apps/web`**: Next.js 14 frontend using the App Router, Material UI, Tailwind CSS v4, and Framer Motion.
- **`apps/api`**: Express.js backend with TypeScript and Prisma ORM.
- **`packages/types`**: Shared TypeScript definitions used across both apps.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (e.g., Supabase)

### Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   - Create `apps/api/.env` from `apps/api/.env.example` and provide your `DATABASE_URL` and `JWT_SECRET`.
   - Create `apps/web/.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:4000`.

3. **Database Setup**:
   ```bash
   npm run db:push -w api
   npm run prisma:seed -w api
   ```

### Running the Project

From the root directory, run both frontend and backend concurrently:
```bash
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000](http://localhost:4000)

## 🌾 Field Status Logic

The system follows strict business rules to compute field status, ensuring stagnant plots are flagged for attention:

- **Completed**: The field stage is set to `HARVESTED`.
- **At Risk**: 
  - No updates recorded in the last 7 days.
  - OR, the field has remained in the `PLANTED` stage for more than 14 days.
- **Active**: All other plots receiving regular updates.

## 🛠 Features

- **Role-Based Access Control**: Admins manage fields; Agents update their assigned plots.
- **Responsive Dashboard**: Mobile-first design that adapts to tablets and desktops.
- **Activity Timeline**: Interactive history of all observations and stage changes.
- **Modern UI/UX**: Agricultural-themed design with smooth animations and skeleton loaders.

## 🔐 Demo Accounts

- **Admin**: `admin@demo.com` / `admin123`
- **Agent**: `agent1@demo.com` / `agent123`
