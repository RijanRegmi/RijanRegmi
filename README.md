# Rijan Regmi - Next.js & Express Monorepo

Enterprise-grade full-stack portfolio and API architecture uniting a modern **Next.js TypeScript** frontend with an **Express.js TypeScript & MongoDB** layered architecture backend.

---

## 📁 Project Structure

```
├── app/                             # Next.js App Router (Figure 1)
│   ├── api/[[...route]]/route.ts    # Serverless API bridge for Vercel deployment
│   ├── globals.css                  # Global Tailwind CSS & design tokens
│   ├── layout.tsx                   # Root HTML layout & metadata
│   └── page.tsx                     # Portfolio landing page
│
├── backend/                         # Layered Architecture Backend (Figure 3)
│   ├── __test__/                    # Unit and integration tests
│   ├── config/                      # Environment, DB, & CORS configurations
│   ├── controllers/                 # HTTP Request controllers
│   ├── database/                    # MongoDB connection & seed scripts
│   ├── dtos/                        # Zod validation schemas & Data Transfer Objects
│   ├── errors/                      # Custom operational error classes
│   ├── middlewares/                 # Error, validation, logger, CORS middlewares
│   ├── models/                      # Mongoose schemas & MongoDB models
│   ├── repositories/                # Data access layer (CRUD operations)
│   ├── routes/                      # Express route definitions
│   ├── services/                    # Business logic layer
│   ├── types/                       # TypeScript interfaces & declarations
│   ├── utils/                       # Response formatting, logging, async handlers
│   ├── app.ts                       # Express application setup
│   └── index.ts                     # Standalone HTTP server entrypoint
│
├── lib/                             # Frontend Shared Modules (Figure 2)
│   ├── actions/                     # Next.js Server Actions
│   ├── api/                         # Client API fetchers (contact, projects, blogs)
│   ├── utils/                       # Class merger & string utilities
│   └── cookie.ts                    # Client/Server cookie management
│
├── public/                          # Static assets (images, PDFs, icons)
├── assets/                          # Original portfolio asset bundle
├── proxy.ts                         # Development proxy helper
├── test-db.ts                       # MongoDB connectivity test script
├── next.config.mjs                  # Next.js configuration
├── tsconfig.json                    # TypeScript compiler options & path aliases
└── package.json                     # Unified scripts and dependencies
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file from `.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rijanregmi_db
NEXT_PUBLIC_API_URL=
```

### 3. Run Development Server
```bash
# Run unified Next.js + API server (Default)
npm run dev

# Or run standalone Express backend on port 5000
npm run dev:backend
```

### 4. Database Seed & Connectivity Test
```bash
# Test MongoDB connection
npm run test:db

# Seed initial projects and blogs into MongoDB
npm run seed
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System and MongoDB connection health check |
| `GET` | `/api/v1/projects` | Fetch all portfolio projects (supports `?category=web`) |
| `POST` | `/api/v1/projects` | Create a new portfolio project |
| `GET` | `/api/v1/blogs` | Fetch all published blog articles |
| `POST` | `/api/v1/blogs` | Create a new blog post |
| `POST` | `/api/v1/blogs/:id/like` | Like a blog article |
| `POST` | `/api/v1/contact` | Submit a contact message (validates inputs) |
| `GET` | `/api/v1/contact` | List received contact submissions |

---

## 🚀 Hosting on Vercel (Single Project)

1. Push this repository to GitHub / GitLab.
2. Import the repository into **Vercel**.
3. Set your environment variables (e.g. `MONGODB_URI`) in the Vercel Project Settings.
4. Deploy! Next.js will automatically serve:
   - **Frontend**: All pages, static assets, and client components.
   - **Backend API**: All `/api/*` requests routed to the layered Express services via `app/api/[[...route]]/route.ts`.
