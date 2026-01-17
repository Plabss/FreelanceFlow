# FreelanceFlow - CRM for Freelancers

FreelanceFlow is a full-stack Customer Relationship Management (CRM) system designed to help freelancers manage clients, track projects, and organize daily tasks in one unified dashboard.

**Live Demo:** [https://freelanceflow-ui.onrender.com/](https://freelanceflow-ui.onrender.com)  
**Backend API:** [https://freelanceflow-api.onrender.com/](https://freelanceflow-api.onrender.com)

## 🚀 Key Features

* **📊 Interactive Dashboard:** Real-time analytics showing total clients, active projects, and upcoming deadlines.
* **🔐 Secure Authentication:** JWT-based auth with secure password hashing (bycrypt).
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

## 📦 How to Run Locally

Follow these steps to set up the project on your local machine.

### Prerequisites
* Node.js (v18+)
* Docker Desktop (for the database) or a local PostgreSQL instance

### 1. Clone the Repository
```bash
git clone https://github.com/Plabss/FreelanceFlow
cd freelance-flow
```
### 2. Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```
#### Configure Environment: Create a .env file in the server/ directory:
```bash
PORT=3000
# Use this connection string if running via Docker Compose (step below)
DATABASE_URL="postgresql://user:password@localhost:5432/freelanceflow_db?schema=public"
JWT_SECRET="super_secret_key_change_me"
```

### Start Database
```bash
# 1. Start PostgreSQL Container
cd ..
docker-compose up -d

# 2. Run Migrations & Seed Data
cd server
npx prisma migrate dev  # Creates tables

# 3. Start the Server
npm run start:dev
```
Server should now be running at http://localhost:3000

### 3. Frontend Setup
Open a new terminal and navigate to the client folder:
```bash
cd client
npm install
```
#### Configure Environment: Create a .env file in the client/ directory:
```bash
VITE_API_URL=http://localhost:3000
```
### Start the Application:
```bash
npm run dev
```
Frontend should now be running at http://localhost:5173

## 🧪 Demo Credentials

To visualize the application, use these credentials on the login screen:

| Email | Password |
| :--- | :--- |
| `john@example.com` | `123456` |