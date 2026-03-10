---
id: 001
title: Portfolio Backend Constitution Created
stage: constitution
date: 2026-03-06
surface: agent
model: Qwen Code
feature: none
branch: main
user: bassam
command: /sp.constitution
labels: ["constitution", "backend", "nodejs", "supabase", "portfolio"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - N/A
---

## Prompt

You are building the BACKEND for "Bassam Shahid Portfolio" — a secure, modern, scalable API server using Node.js/Express + Supabase (PostgreSQL) to replace MongoDB.

This is the supreme, non-negotiable PROJECT CONSTITUTION for backend. Every endpoint, model, security decision, code pattern MUST follow it strictly. No deviations without explicit approval.

1. Core Philosophy & Goals
- Primary: Handle contact form submissions (insert into Supabase DB + send email notification)
- Serve portfolio data: projects, skills, testimonials (optional) via GET endpoints
- Use Supabase for database (PostgreSQL) — leverage @supabase/supabase-js client for all DB operations (queries, inserts, auth if needed later)
- Keep it lightweight: Express for custom routing/validation/email, but let Supabase handle most CRUD via its auto-generated REST or client SDK
- Security first: NEVER hardcode credentials, use env vars, validate inputs, Row Level Security (RLS) enable karo Supabase dashboard mein
- Scalable & maintainable: modular code, async/await, proper error handling
- No full custom ORM (Prisma/Drizzle optional later) — start with supabase-js

2. Locked Tech Stack (Backend Only)
- Node.js 20+ / Express.js
- @supabase/supabase-js (^2.x) — main client for DB operations
- Nodemailer — for contact form email notifications
- Joi or Zod — input validation (contact form required)
- dotenv — env vars
- cors — frontend se allow
- Optional future: JWT/Supabase Auth for admin endpoints

3. Environment Variables (Mandatory — DO NOT HARDCODE)
- PORT: Server port (default 5000)
- SUPABASE_URL: https://your-project-ref.supabase.co (from dashboard → Settings → API)
- SUPABASE_ANON_KEY: anon public key (from dashboard → Settings → API)
- SUPABASE_SERVICE_ROLE_KEY: service_role key (for server-side privileged ops like insert without RLS — careful use!)
- EMAIL_USER: sender email (e.g. bsdigitalmarketers @gmail.com)
- EMAIL_PASS: app password / token for Nodemailer (Gmail/Resend recommended)
- FRONTEND_URL: http://localhost:3000 or production URL (for CORS)

Note: Supabase connection string (postgresql://...) ko directly use mat karo — supabase-js client SUPABASE_URL + ANON_KEY se handle karta hai. Service role key privileged ops ke liye.

4. Folder Structure (Strict Follow)
backend/
├── server.js                  # Entry point (app setup, routes mount, server listen)
├── .env
├── routes/
│   ├── contact.js
│   ├── projects.js
│   ├── skills.js
│   └── testimonials.js       # optional
├── controllers/
│   ├── contactController.js
│   ├── projectsController.js
│   ├── skillsController.js
│   └── testimonialsController.js
├── services/
│   └── supabase.js           # Supabase client init + helper functions
├── utils/
│   ├── email.js              # Nodemailer transporter setup + send function
│   └── validation.js         # Joi/Zod schemas
└── middleware/
    └── errorHandler.js       # Global error middleware

5. Supabase Integration Rules
- Initialize client once in services/supabase.js (use anon key for public reads, service_role for inserts)
- Tables: Create in Supabase dashboard → Table Editor
  - projects: id (uuid), title, description, tech_stack (jsonb/array), live_link, github_link, image_url, category
  - skills: id (uuid), name, category (Frontend/Backend/AI/Tools), level (optional)
  - contacts: id (uuid), name, email, message, created_at
  - testimonials: id (uuid), name, role, message, avatar_url (optional)
- Enable RLS: public read on projects/skills/testimonials, insert only on contacts (or authenticated)
- Use supabase.from('table').select() for GET, .insert() for contact

6. API Endpoints Constitution
- All: JSON responses, proper status codes (200, 201, 400, 500)
- POST /api/contact
  - Body: { name: string required, email: string required/email, message: string required }
  - Action: Validate → Insert to 'contacts' → Send email → Return success
- GET /api/projects → Return all projects (select * from projects)
- GET /api/skills → Return all skills grouped by category (or simple list)
- GET /api/testimonials → Optional, return list

7. Email & Security Rules
- Use Nodemailer with Gmail/Resend/SendGrid
- Validate inputs strictly (no empty fields, valid email)
- CORS: Allow only frontend origin
- Rate limiting optional later (express-rate-limit)

8. General Governance
- Code: Clean, async/await, try-catch everywhere
- Logging: console for dev, proper logger later
- No console.log in production paths
- Future: Add Supabase Auth for admin (JWT verify)

This constitution is the law. When generating code, always refer back: use supabase-js, env vars, validation, email on contact, premium & secure feel.

Now generate constitution.md or follow for all backend generation.

## Response snapshot

Created the complete project constitution at `.specify/memory/constitution.md` with version 1.0.0. The constitution includes 8 major sections:
1. Core Philosophy & Goals (5 principles: Purpose-Driven, Supabase-First, Security First, Input Validation, Modular Architecture)
2. Locked Tech Stack (Node.js 20+, Express, Supabase-js, Nodemailer, Joi/Zod, dotenv, cors)
3. Environment Variables (7 mandatory vars with examples)
4. Folder Structure (strict modular architecture)
5. Supabase Integration Rules (4 tables with schemas, RLS policies)
6. API Endpoints Constitution (4 endpoints with specifications)
7. Email & Security Rules
8. General Governance (code standards, logging, future considerations)

Validated dependent templates (plan-template.md, spec-template.md, tasks-template.md) - all use generic constitution references, no updates needed.

## Outcome

- ✅ Impact: Initial constitution v1.0.0 created for Bassam Shahid Portfolio Backend project
- 🧪 Tests: N/A (constitution document creation)
- 📁 Files: 1 file created/overwritten (.specify/memory/constitution.md)
- 🔁 Next prompts: /sp.specify to create feature specifications based on constitution
- 🧠 Reflection: User provided comprehensive requirements; constitution captures all non-negotiable constraints around Supabase usage, security, modularity

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Create feature specs for contact form endpoint first
