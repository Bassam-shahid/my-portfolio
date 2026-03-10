# Implementation Plan: Portfolio Backend API

**Branch**: `001-portfolio-backend-api` | **Date**: 2026-03-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification for Portfolio Backend API with Supabase integration

## Summary

Build a secure, modular REST API server using Node.js/Express and Supabase (PostgreSQL) to handle contact form submissions with email notifications and serve portfolio data (projects, skills, testimonials). The implementation follows strict constitutional requirements: Supabase-first architecture, environment variable security, input validation, and modular separation of concerns.

## Technical Context

**Language/Version**: Node.js 20+ (ESM modules with import/export syntax)
**Primary Dependencies**: Express.js (^4.x), @supabase/supabase-js (^2.x), Nodemailer (^6.x), Joi (^17.x) or Zod (^3.x), dotenv (^16.x), cors (^2.x)
**Storage**: Supabase PostgreSQL (managed cloud database)
**Testing**: Jest or Vitest for unit tests, Supertest for integration tests
**Target Platform**: Linux server (Vercel, Render, Railway deployment)
**Project Type**: Single backend API server
**Performance Goals**: p95 latency <500ms, handle 100 concurrent requests, contact submission <3s end-to-end
**Constraints**: No hardcoded credentials, CORS restricted to FRONTEND_URL, validation on all inputs
**Scale/Scope**: 4 endpoints (POST /api/contact, GET /api/projects, GET /api/skills, GET /api/testimonials)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Purpose-Driven Architecture | ✅ PASS | Feature directly serves contact form handling and portfolio data serving |
| II. Supabase-First Data Layer | ✅ PASS | All data operations use @supabase/supabase-js client |
| III. Security First | ✅ PASS | Environment variables, validation, RLS policies, no hardcoded secrets |
| IV. Input Validation & Data Integrity | ✅ PASS | Joi/Zod validation on contact form, 400 responses for invalid input |
| V. Modular Architecture | ✅ PASS | Strict separation: routes, controllers, services, utils, middleware |

**Gate Result**: PASS - All constitutional principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-backend-api/
├── plan.md              # This file
├── research.md          # Phase 0 output (below)
├── data-model.md        # Phase 1 output (below)
├── quickstart.md        # Phase 1 output (to be created)
├── contracts/           # Phase 1 output (to be created)
│   ├── contact.yaml
│   ├── projects.yaml
│   ├── skills.yaml
│   └── testimonials.yaml
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── server.js                  # Entry point
├── .env                       # Environment variables (gitignored)
├── .env.example               # Template with placeholders
├── routes/
│   ├── contact.js
│   ├── projects.js
│   ├── skills.js
│   └── testimonials.js
├── controllers/
│   ├── contactController.js
│   ├── projectsController.js
│   ├── skillsController.js
│   └── testimonialsController.js
├── services/
│   └── supabase.js            # Supabase client + helpers
├── utils/
│   ├── email.js               # Nodemailer setup
│   └── validation.js          # Joi/Zod schemas
├── middleware/
│   └── errorHandler.js        # Global error handling
└── tests/
    ├── contract/
    ├── integration/
    └── unit/
```

**Structure Decision**: Single backend project structure as mandated by constitution. Modular Express architecture with clear separation of concerns.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitutional principles satisfied.

---

## Phase 0: Research & Technology Decisions

### 1. Validation Library: Joi vs Zod

**Decision**: Use **Joi** for input validation

**Rationale**:
- Mature, battle-tested validation library with extensive error messages
- Better suited for runtime validation in Express middleware
- Clear schema definition with `.required()`, `.min()`, `.email()` validators
- Widely used in Express ecosystems
- Error formatting is more descriptive for API responses

**Alternatives Considered**:
- **Zod**: TypeScript-first, excellent type inference, but better suited for TypeScript projects. Our project uses plain JavaScript (ESM).
- **express-validator**: Middleware-specific, but less flexible for complex schemas

### 2. Email Service: Gmail vs Resend vs SendGrid

**Decision**: Use **Gmail with App Password** (for MVP), migrate to **Resend** for production

**Rationale**:
- Gmail: Free, easy setup for portfolio-scale email volume, user already has bsdigitalmarketers@gmail.com
- Resend: Modern API, better deliverability, free tier (100 emails/day), recommended for production
- Nodemailer supports both with simple transporter configuration swap

**Alternatives Considered**:
- **SendGrid**: Free tier (100 emails/day), but more complex setup
- **SMTP directly**: Less reliable, spam concerns

### 3. Supabase Client Configuration

**Decision**: Initialize single Supabase client in `services/supabase.js` with singleton pattern

**Rationale**:
- Constitution mandates single initialization point
- Use `SUPABASE_ANON_KEY` for public reads (projects, skills, testimonials)
- Use `SUPABASE_SERVICE_ROLE_KEY` for contact insert (bypass RLS)
- Singleton prevents multiple client instantiations across requests

### 4. ESM vs CommonJS

**Decision**: Use **ESM** (import/export syntax)

**Rationale**:
- Modern JavaScript standard
- Constitution mentions ESM in non-functional requirements
- Better tree-shaking, static analysis
- `"type": "module"` in package.json

---

## Phase 1: Design & Contracts

### Data Model

**File**: `data-model.md`

#### Contact Entity
```javascript
{
  id: string (uuid, auto-generated),
  name: string (required, min 1 char),
  email: string (required, valid email format),
  message: string (required, min 10 chars, max 2000 chars),
  created_at: timestamp (auto-generated, UTC)
}
```

#### Project Entity
```javascript
{
  id: string (uuid, auto-generated),
  title: string (required, max 200 chars),
  description: string (required, max 1000 chars),
  tech_stack: array[string] (e.g., ["Node.js", "Express", "Supabase"]),
  live_link: string (URL, optional),
  github_link: string (URL, optional),
  image_url: string (URL, required),
  category: string (e.g., "Web Development", "AI Applications", "Agentic Systems", "SaaS Products"),
  created_at: timestamp (auto-generated, UTC)
}
```

#### Skill Entity
```javascript
{
  id: string (uuid, auto-generated),
  name: string (required, max 100 chars),
  category: string (required: "Frontend" | "Backend" | "AI/Agentic" | "Tools"),
  level: integer (optional, 1-100 proficiency indicator)
}
```

#### Testimonial Entity
```javascript
{
  id: string (uuid, auto-generated),
  name: string (required, max 200 chars),
  role: string (required, max 200 chars - e.g., "CTO at TechCorp"),
  message: string (required, max 1000 chars),
  avatar_url: string (URL, optional),
  created_at: timestamp (auto-generated, UTC)
}
```

### API Contracts

**Directory**: `contracts/`

#### POST /api/contact

**Request**:
```http
POST /api/contact HTTP/1.1
Content-Type: application/json
Origin: https://frontend-origin.com

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in working with you..."
}
```

**Validation Schema** (Joi):
```javascript
Joi.object({
  name: Joi.string().required().min(1).max(100),
  email: Joi.string().email().required(),
  message: Joi.string().required().min(10).max(2000)
})
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Thanks! I'll get back soon."
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Must be a valid email address",
    "message": "Message must be at least 10 characters"
  }
}
```

**Error Response** (500 Server Error):
```json
{
  "error": "Failed to submit contact form. Please try again later."
}
```

#### GET /api/projects

**Request**:
```http
GET /api/projects HTTP/1.1
Origin: https://frontend-origin.com
```

**Success Response** (200 OK):
```json
[
  {
    "id": "uuid-here",
    "title": "AI-Powered Book Analyzer",
    "description": "Full-stack application for book analysis...",
    "tech_stack": ["Node.js", "React", "Supabase", "OpenAI"],
    "live_link": "https://live-demo.com",
    "github_link": "https://github.com/user/repo",
    "image_url": "https://images.com/project.png",
    "category": "AI Applications"
  }
]
```

**Error Response** (500 Server Error):
```json
{
  "error": "Failed to fetch projects. Please try again later."
}
```

#### GET /api/skills

**Request**:
```http
GET /api/skills HTTP/1.1
Origin: https://frontend-origin.com
```

**Success Response** (200 OK):
```json
[
  {
    "id": "uuid-here",
    "name": "React",
    "category": "Frontend",
    "level": 90
  },
  {
    "id": "uuid-here",
    "name": "Node.js",
    "category": "Backend",
    "level": 95
  }
]
```

**Alternative: Grouped by Category**:
```json
{
  "Frontend": [
    { "name": "React", "level": 90 },
    { "name": "Next.js", "level": 85 }
  ],
  "Backend": [
    { "name": "Node.js", "level": 95 },
    { "name": "Express", "level": 90 }
  ]
}
```

#### GET /api/testimonials

**Request**:
```http
GET /api/testimonials HTTP/1.1
Origin: https://frontend-origin.com
```

**Success Response** (200 OK):
```json
[
  {
    "id": "uuid-here",
    "name": "Jane Smith",
    "role": "CEO at StartupXYZ",
    "message": "Bassam delivered exceptional work...",
    "avatar_url": "https://images.com/jane.png"
  }
]
```

### Quickstart Guide

**File**: `quickstart.md`

```markdown
# Quickstart: Portfolio Backend API

## Prerequisites

- Node.js 20+ installed
- Supabase account and project created
- Email service credentials (Gmail App Password or Resend API key)

## Setup Steps

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
EMAIL_USER=bsdigitalmarketers@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

### 3. Create Supabase Tables

Go to Supabase Dashboard → Table Editor and create:

**contacts**: id (uuid), name (text), email (text), message (text), created_at (timestamp)
**projects**: id (uuid), title (text), description (text), tech_stack (jsonb), live_link (text), github_link (text), image_url (text), category (text)
**skills**: id (uuid), name (text), category (text), level (int)
**testimonials**: id (uuid), name (text), role (text), message (text), avatar_url (text)

Enable RLS:
- projects, skills, testimonials: Allow public read
- contacts: Allow insert only

### 4. Seed Sample Data (Optional)

Insert sample projects, skills, and testimonials via Supabase SQL Editor or Table Editor.

### 5. Run Development Server

```bash
npm run dev
```

Server starts on `http://localhost:5000`

### 6. Test Endpoints

```bash
# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"This is a test message"}'

# Test projects endpoint
curl http://localhost:5000/api/projects
```

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard

### Render/Railway

1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Add environment variables in dashboard
```

---

## Constitution Check (Post-Design)

Re-evaluating after Phase 1 design completion:

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Purpose-Driven Architecture | ✅ PASS | Design focuses on contact form and portfolio data endpoints |
| II. Supabase-First Data Layer | ✅ PASS | All data operations via supabase-js client |
| III. Security First | ✅ PASS | Env vars, validation, RLS, no hardcoded secrets |
| IV. Input Validation & Data Integrity | ✅ PASS | Joi schemas defined, 400 responses documented |
| V. Modular Architecture | ✅ PASS | Routes, controllers, services, utils, middleware separated |

**Gate Result**: PASS - Design fully compliant with constitution

---

**Next Phase**: Run `/sp.tasks` to break this plan into implementation tasks
