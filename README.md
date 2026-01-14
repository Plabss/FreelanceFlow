# FreelanceFlow - CRM for Freelancers

FreelanceFlow is a full-stack Customer Relationship Management (CRM) system designed to help freelancers manage clients, track projects, and organize daily tasks in one unified dashboard.

**Live Demo:** [https://freelanceflow-ui.onrender.com/](https://freelanceflow-ui.onrender.com)  
**Backend API:** [https://freelanceflow-api.onrender.com/](https://freelanceflow-api.onrender.com)

## 🚀 Key Features

* **📊 Interactive Dashboard:** Real-time analytics showing total clients, active projects, and upcoming deadlines.
* **🔐 Secure Authentication:** JWT-based auth with secure password hashing (Argon2).
* **👥 Client Management:** Complete CRUD operations for client profiles.
* **📁 Project Tracking:** Manage project lifecycles with status tracking (Pending -> Completed).
* **✅ Task Management:** To-do list with simple toggle actions for reminders.
* **📅 Activity Timeline:** Log calls, emails, and meetings with visual timeline indicators.

## 🛠️ Tech Stack

**Frontend:**
* React + Vite (TypeScript)
* Redux Toolkit (State Management)
* TanStack Query (Data Fetching & Caching)
* Tailwind CSS (Styling)

**Backend:**
* NestJS (Node.js Framework)
* Prisma ORM (Database Management)
* PostgreSQL (Relational Database)
* Docker (Containerization)

## 🏗️ Architecture

The application follows a modular architecture:
1.  **Client:** Consumes the REST API using Axios with robust interceptors for JWT handling.
2.  **Server:** Built with NestJS modules (Auth, Users, Clients, Projects) ensuring separation of concerns.
3.  **Database:** Hosted PostgreSQL instance managed via Prisma Migrations.