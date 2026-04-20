# SmartSeason Field Monitoring System 🌾

SmartSeason is a production-grade field monitoring application designed to streamline agricultural management. It enables administrators to coordinate field assignments and allows field agents to track crop progress through an intuitive, mobile-first interface.

This project was built as a demonstration of clean architecture, role-based security, and robust business logic for technical assessment.

---

## 🚀 Live Links
- **Frontend**: [https://smartseason.vercel.app](https://smartseason.vercel.app) *(Example URL)*
- **Backend**: [https://smartseason-api.onrender.com](https://smartseason-api.onrender.com) *(Example URL)*

## 🔑 Demo Credentials
| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@demo.com` | `admin123` |
| **Field Agent** | `agent1@demo.com` | `agent123` |

---

## ✨ Key Features
- **Role-Based Access Control (RBAC)**: Secure separation between administrative oversight and field operations.
- **Dynamic Field Tracking**: Real-time status computation based on activity timestamps and growth stages.
- **Activity Timeline**: Comprehensive history of updates and observations for every field.
- **Responsive Dashboard**: Hand-crafted UI optimized for both desktop coordinators and mobile agents.
- **Automated Health Monitoring**: Integrated health-check endpoints for production reliability.

## 🧱 System Architecture

SmartSeason utilizes a modern **Monorepo** structure to ensure type safety and seamless integration between components:

- **Frontend (Next.js)**: A React-based application using the App Router. It communicates with the backend via a centralized Axios instance, utilizing JWTs for stateless authentication.
- **Backend (Express + TypeScript)**: A RESTful API built with strict typing and a service-oriented architecture. It handles business logic, authentication, and data persistence.
- **Database (PostgreSQL)**: Managed via **Prisma ORM**, hosted on **Supabase**. It ensures relational integrity between users, fields, and update logs.
- **Shared Types**: A dedicated package for shared TypeScript interfaces, ensuring "single source of truth" across the entire stack.

## 🌾 Field Status Logic

The core value of SmartSeason lies in its precise field monitoring logic, located in `utils/status.ts`. The system automatically computes a field's health based on three categories:

1.  **Completed**: Any field marked with the `HARVESTED` stage.
2.  **At Risk**:
    - **Stagnancy**: Any field that has not received an update in the last **7 days**.
    - **Growth Delay**: Any field remainig in the `PLANTED` stage for more than **14 days** without progression.
3.  **Active**: Any field receiving regular updates and progressing normally through growth stages.

*Reasoning: This tiered logic was chosen to provide immediate actionable insights for administrators, highlighting potential issues before they impact yield.*

---

## 🛠 Tech Stack
- **Languages**: TypeScript (Full Stack)
- **Frontend**: Next.js 14, Tailwind CSS v4, Material UI, Framer Motion
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **DevOps**: Docker, GitHub Actions (CI), Vercel, Render

## 🔌 API Overview
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | System health check | Public |
| `POST` | `/auth/login` | User authentication | Public |
| `GET` | `/fields` | List available fields | Auth |
| `POST` | `/fields/:id/assign` | Assign agent to field | Admin |
| `POST` | `/fields/:id/updates` | Create field update | Agent/Admin |
| `GET` | `/dashboard` | Aggregate metrics | Auth |

---

## ⚙️ Setup Instructions

1. **Clone & Install**:
   ```bash
   git clone [repository-url]
   npm install
   ```
2. **Environment Configuration**:
   Create `.env` files in `apps/api` and `apps/web` as per the provided `.env.example` templates.
3. **Database Migration**:
   ```bash
   npm run db:push -w api
   ```
4. **Run Development**:
   ```bash
   npm run dev
   ```

## 🧠 Design Decisions & Trade-offs

- **Monorepo (npm workspaces)**: Chosen to eliminate type duplication and allow atomic commits for full-stack features.
- **Prisma ORM**: Selected for its excellent Developer Experience and auto-generated type safety, which significantly reduced boilerplate.
- **Stateless Auth (JWT)**: Implemented to allow the backend to scale horizontally without session synchronization.
- **MUI + Tailwind Hybrid**: Used MUI for complex accessible components (Inputs/Tables) while leaning on Tailwind v4 for rapid, bespoke layout styling.
- **Simple Status Logic**: Opted for time-based thresholds over complex ML models to prioritize transparency and immediate feedback for the user.

## 🔮 Future Improvements
- **Advanced Validation**: Integration of **Zod** for exhaustive schema validation on both ends.
- **Pagination & Search**: Implementing server-side filtering for the fields directory to handle growing data sets.
- **Push Notifications**: Real-time alerts for agents when a field is assigned or flagged as "At Risk".
- **Audit Logs**: A dedicated audit trail for all administrative actions to improve security compliance.

---

**Developed for Technical Assessment**
*Clear Thinking • Working System • Sensible Trade-offs*
