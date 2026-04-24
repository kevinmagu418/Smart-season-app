# SmartSeason Field Monitoring System

## Overview
SmartSeason is a full-stack coordination platform designed to optimize agricultural field monitoring. It solves the communication gap between farm management and field observers by providing a structured, data-driven viewport into crop lifecycles.

The system is tailored for two primary user groups:
- **Administrators**: Manage the global field directory, assign agents to specific plots, and monitor growth metrics via a centralized dashboard.
- **Field Agents**: Utilize a mobile-optimized interface to record observational notes and progress growth stages directly from the field.

---

## Features

- **Authentication**: Secure, role-based access for Administrators and Field Agents.
- **Field Management**: Multi-unit tracking with support for diverse crop types and planting schedules.
- **Field Assignment**: Dedicated logic for linking specific Field Agents to target plots.
- **Field Updates**: Sequential timeline logging for field notes and growth stage transitions.
- **Dashboard Summaries**: High-level statistical cards for total fleet health and active units.
- **Status Computation**: Automated health derivation (Active, At Risk, Completed) based on growth patterns.

---

## Tech Stack

### Frontend
- **Next.js 14** (App Router) for hybrid rendering.
- **Tailwind CSS v4** for high-performance styling and bespoke design tokens.
- **Framer Motion** for smooth, meaningful micro-interactions.
- **Material UI (MUI)** for complex form primitives and accessible layout skeletons.

### Backend
- **Node.js & Express** with a service-oriented architecture.
- **Prisma ORM** for type-safe database access and automated migrations.
- **JWT (JSON Web Tokens)** for stateless, secure authentication.

### Database
- **PostgreSQL** (hosted on Supabase) with connection pooling (PGBouncer) for high concurrency.

### Deployment
- **Frontend**: Vercel (Production Build).
- **Backend**: Render (Dockerized Node.js Environment).

---

## System Design

The system follows a modular **Monorepo** architecture using **npm Workspaces** to ensure strict separation of concerns while maintaining a shared source of truth:

- **Frontend (`apps/web`)**: A reactive React application that communicates with the API via a centralized Axios instance with local caching for statistics.
- **Backend (`apps/api`)**: A RESTful API structured into controllers, services, and route layers to isolate business logic from HTTP handling.
- **Shared Package (`packages/types`)**: The core interface definitions shared between the client and server to ensure end-to-end type safety.

Data flows from the Agent's mobile interface through the API to the PostgreSQL database, where the Admin dashboard reactively pulls the latest state for real-time monitoring.

---

## Data Model (High-Level)

- **Users**: Defines identity and permissions (Admin vs Agent).
- **Fields**: The core unit of monitoring (Name, CropType, PlantingDate, Stage).
- **Field Updates**: Chronological snapshots of field progress linked to both a Field and an Agent.

**Relationships**: A Field has one assigned Agent and many Field Updates. Every Field Update is authored by a specific Agent.

---

## Field Status Logic

The system includes a health-computation engine that derives a status for each field based on its activity and growth timeline:

- **At Risk**: Determined if a field meets either of these failure conditions:
  - **Growth Lag**: The field has remained in the `PLANTED` stage for more than **14 days**.
  - **Stagnancy**: No updates or observational notes have been recorded in the last **7 days**.
- **Completed**: Automatically set when a field is transitioned to the `HARVESTED` stage.
- **Active**: Default state for fields making healthy progress.

---

## Setup Instructions

### 1. Clone repo
```bash
git clone <repository-url>
cd smartseason-app
```

### 2. Install dependencies
From the root directory:
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in `apps/api/`:
```env
PORT=4000
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-secret-key"
FRONTEND_URL="http://localhost:3000"
```

### 4. Run backend
```bash
cd apps/api
npx prisma generate
npm run dev
```

### 5. Run frontend
```bash
cd ../web
npm run dev
```

---

## Demo Credentials

**Administrator**  
Email: `admin@demo.com`  
Password: `admin123`  

**Field Agent**  
Email: `agent1@demo.com`  
Password: `agent123`  

---

## How to Test the System

### Admin Flow
- **Dashboard Analysis**: Log in as Admin to view high-level metric cards showing total plots and health ratio.
- **Global Directory**: Navigate to the Fields page to see all plots across the entire network.
- **System Activity**: Scroll the dashboard to view the chronological feed of recent agent observations.

### Agent Flow
- **Filtered View**: Log in as an Agent to see only the fields assigned to your account.
- **Operational Logging**: Open a field card to view the historical timeline.
- **Submit Update**: Add a note and update the growth stage (e.g., transition from `PLANTED` to `GROWING`) to see the record update instantly.

### Status Logic Test
- **Validation Scenario**: The data seed includes **"North Valley Plot"**. 
- **Observation**: If you leave this plot in the `PLANTED` stage for over 14 days without an update, its status will transition from `Active` to `At Risk` in the dashboard, flagging it for administrative review.

---

## Design Decisions & Trade-offs

- **Architecture Choice**: I chose a Monorepo to keep the frontend and backend in a "locked-step" synchronization, which is critical for rapidly evolving SaaS products.
- **Relational DB**: PostgreSQL was selected over NoSQL because agricultural monitoring requires strong consistency and complex relationships (e.g., relating updates to specific agents and fields).
- **REST vs GraphQL**: Opted for REST APIs for simplicity and maintainability, ensuring the project remains clean and readable for reviewers without unnecessary abstraction layers.
- **UI Frameworks**: Combined **Tailwind CSS** for bespoke aesthetic control with **MUI** for robust form handling, prioritizing speed-to-delivery while maintaining premium design standards.

---

## Assumptions

- **Linear Lifecycle**: The field lifecycle is assumed to move linearly from Planted to Growing to Harvested.
- **Single Assignment**: For the scope of this demo, each field is assigned to a single agent to simplify accountability.
- **Local Consistency**: The system assumes agents have reasonable network connectivity to sync updates to the central API.

---

## Deployment

- **Frontend (Vercel)**: https://smart-season-app-web.vercel.app
- **Backend (Render)**: https://smart-season-app.onrender.com
- **Infrastructure**: The system is fully Dockerized for the backend (Render) and uses a high-performance build pipeline for the frontend (Vercel).

---

## Notes

- **Scalability**: For a larger deployment, I would implement a background job worker (like BullMQ) to process field health checks asychronously rather than computing them on the fly during API requests.
- **Mapping**: A future iteration would include GIS/Map integration to show the physical location of "At Risk" plots.
