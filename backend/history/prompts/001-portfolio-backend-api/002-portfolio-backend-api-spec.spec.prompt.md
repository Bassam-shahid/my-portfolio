---
id: 002
title: Portfolio Backend API Specification
stage: spec
date: 2026-03-06
surface: agent
model: Qwen Code
feature: 001-portfolio-backend-api
branch: 001-portfolio-backend-api
user: bassam
command: /sp.specify
labels: ["spec", "backend", "api", "supabase", "portfolio"]
links:
  spec: specs/001-portfolio-backend-api/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-portfolio-backend-api/spec.md
  - specs/001-portfolio-backend-api/checklists/requirements.md
tests:
  - N/A
---

## Prompt

- Frontend (Next.js) will call these APIs (e.g., fetch('/api/projects'), POST('/api/contact'))
- Deployable on Vercel, Render, Railway, etc. (serverless-friendly if possible, but standard Express fine)

Exact required features / endpoints:
1. POST /api/contact
   - Body: { name: string (required), email: string (valid email required), message: string (required, min 10 chars) }
   - Actions: Validate input → Insert into 'contacts' table in Supabase → Send email notification (to my email) with details → Return { success: true, message: "Thanks! I'll get back soon." } or error
   - Use Nodemailer for email (transporter setup with Gmail/Resend/etc.)

2. GET /api/projects
   - Return array of all projects from 'projects' table
   - Fields expected: id, title, description, tech_stack (array or json), live_link, github_link, image_url, category (e.g., "Web Development", "AI Applications", "Agentic Systems", "SaaS Products")
   - Sorted by created_at desc or custom order

3. GET /api/skills
   - Return skills data from 'skills' table
   - Fields: name, category (Frontend, Backend, AI/Agentic, Tools), level (optional number/string)
   - Group by category in response if possible (or simple list, frontend can group)

4. GET /api/testimonials (optional but include)
   - Return array of testimonials
   - Fields: name, role/company, message, avatar_url (optional)

Non-functional requirements:
- Use environment variables strictly (SUPABASE_URL, SUPABASE_ANON_KEY or SERVICE_ROLE_KEY, EMAIL_USER, EMAIL_PASS, PORT, FRONTEND_URL for CORS)
- Validation: Strict on contact form (Joi or Zod schemas) — reject invalid data with 400
- Error handling: Global middleware for 500 errors, JSON error responses { error: "message" }
- CORS: Allow only frontend origin (process.env.FRONTEND_URL)
- Logging: Basic console for dev, structured later
- No authentication required for these public endpoints (use Supabase RLS for read/insert protection)
- Performance: Keep responses fast (Supabase queries efficient)
- Code style: ESM (import/export), async/await, clean modular structure

Database (Supabase PostgreSQL) assumptions:
- Tables already created or will be: contacts (id, name, email, message, created_at), projects (...), skills (...), testimonials (...)
- Use supabase-js client with service_role key for server-side inserts (bypass RLS if needed for contact insert)
- Public read on projects/skills/testimonials (RLS allow anon read)

Do NOT:
- Use MongoDB or any other DB
- Implement full auth/admin now (just mention as future)
- Hardcode any keys/URLs
- Add unnecessary dependencies (keep minimal: express, @supabase/supabase-js, nodemailer, joi/zod, cors, dotenv)

Generate a comprehensive project specification: overview, features list, API contracts (request/response examples), data models, security notes, deployment hints, aligned 100% with the constitution (Supabase integration, env vars, validation, email, modular Express setup).

## Response snapshot

Created comprehensive feature specification at `specs/001-portfolio-backend-api/spec.md` with:
- 4 user stories (Contact Form P1, Projects P2, Skills P3, Testimonials P4)
- 15 functional requirements (FR-001 through FR-015)
- 4 key entities (Contact, Project, Skill, Testimonial)
- 7 success criteria (SC-001 through SC-007)
- Edge cases and assumptions documented
- Future considerations (out of scope)

Created quality checklist at `specs/001-portfolio-backend-api/checklists/requirements.md` - all items passed validation. No [NEEDS CLARIFICATION] markers needed.

Branch created: `001-portfolio-backend-api`

## Outcome

- ✅ Impact: Complete feature specification for Portfolio Backend API ready for planning phase
- 🧪 Tests: Specification quality checklist created and passed (all items marked complete)
- 📁 Files: 2 files created (spec.md, checklists/requirements.md)
- 🔁 Next prompts: /sp.plan to create technical implementation plan
- 🧠 Reflection: User provided detailed requirements; specification captures all user stories, requirements, and success criteria without implementation details

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to /sp.plan for technical architecture
