<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0 (Initial constitution)
Modified principles: N/A (initial creation)
Added sections:
  - Core Philosophy & Goals
  - Locked Tech Stack
  - Environment Variables
  - Folder Structure
  - Supabase Integration Rules
  - API Endpoints Constitution
  - Email & Security Rules
  - General Governance
Removed sections: N/A
Templates requiring updates:
  - ✅ plan-template.md: No updates needed (generic)
  - ✅ spec-template.md: No updates needed (generic)
  - ✅ tasks-template.md: No updates needed (generic)
Follow-up TODOs: None
-->

# Bassam Shahid Portfolio Backend Constitution

This constitution is the supreme law for the Bassam Shahid Portfolio Backend project. Every endpoint, model, security decision, and code pattern MUST follow it strictly. No deviations without explicit approval.

## Core Philosophy & Goals

### I. Purpose-Driven Architecture
The backend serves two primary functions:
1. **Contact Form Handling**: Process form submissions by inserting into Supabase DB and sending email notifications
2. **Portfolio Data Serving**: Expose GET endpoints for projects, skills, and testimonials

All features MUST justify their existence against these core purposes. Unnecessary complexity is rejected.

### II. Supabase-First Data Layer
Supabase (PostgreSQL) is the exclusive database solution. All data operations MUST use `@supabase/supabase-js` client. Custom ORMs (Prisma, Drizzle) are prohibited unless explicitly approved later. Leverage Supabase's auto-generated REST APIs and client SDK for CRUD operations.

### III. Security First (NON-NEGOTIABLE)
- **NEVER** hardcode credentials or secrets in source code
- **ALWAYS** use environment variables for sensitive configuration
- **ALWAYS** validate all user inputs before processing
- **ENABLE** Row Level Security (RLS) in Supabase dashboard for all tables
- **USE** service_role key only for privileged server-side operations

### IV. Input Validation & Data Integrity
All user-facing endpoints MUST validate inputs using Joi or Zod. Contact form submissions require strict validation: name (non-empty), email (valid format), message (non-empty). Invalid requests MUST return 400 Bad Request with clear error messages.

### V. Modular Architecture
Code MUST follow strict separation of concerns:
- **Routes**: Handle HTTP routing and request/response mapping
- **Controllers**: Orchestrate business logic flow
- **Services**: Encapsulate external service integrations (Supabase, email)
- **Utils**: Shared utilities (validation schemas, email transporters)
- **Middleware**: Cross-cutting concerns (error handling, CORS)

## Locked Tech Stack

The following technologies are approved and locked for this project:

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Runtime | Node.js | 20+ | JavaScript runtime |
| Framework | Express.js | Latest | HTTP routing & middleware |
| Database Client | @supabase/supabase-js | ^2.x | Supabase PostgreSQL integration |
| Email | Nodemailer | Latest | Contact form email notifications |
| Validation | Joi or Zod | Latest | Input validation schemas |
| Configuration | dotenv | Latest | Environment variable management |
| CORS | cors | Latest | Cross-origin resource sharing |

**Prohibited**: MongoDB, Mongoose, custom ORM implementations, full-stack frameworks (Next.js, NestJS) unless constitution amended.

## Environment Variables

All configuration MUST use environment variables. The following are MANDATORY:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `SUPABASE_URL` | Supabase project URL | `https://your-project-ref.supabase.co` |
| `SUPABASE_ANON_KEY` | Public anon key from dashboard | `eyJh...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for privileged ops | `eyJh...` |
| `EMAIL_USER` | Sender email address | `bsdigitalmarketers@gmail.com` |
| `EMAIL_PASS` | Email app password/token | `your-app-password` |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:3000` |

**NEVER** commit `.env` files. Provide `.env.example` with placeholder values.

## Folder Structure

The following structure is MANDATORY. Do not deviate without approval:

```
backend/
├── server.js                  # Entry point (app setup, routes, server listen)
├── .env                       # Environment variables (gitignored)
├── .env.example               # Template with placeholder keys
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
│   └── supabase.js            # Supabase client initialization + helpers
├── utils/
│   ├── email.js               # Nodemailer setup + send function
│   └── validation.js          # Joi/Zod schemas
└── middleware/
    └── errorHandler.js        # Global error handling middleware
```

## Supabase Integration Rules

### Database Schema
Tables MUST be created in Supabase Dashboard → Table Editor with the following structure:

**projects**:
- `id` (uuid, primary key)
- `title` (text, not null)
- `description` (text, not null)
- `tech_stack` (jsonb, array of strings)
- `live_link` (text)
- `github_link` (text)
- `image_url` (text)
- `category` (text)

**skills**:
- `id` (uuid, primary key)
- `name` (text, not null)
- `category` (text, not null) - e.g., Frontend/Backend/AI/Tools
- `level` (integer, optional)

**contacts**:
- `id` (uuid, primary key)
- `name` (text, not null)
- `email` (text, not null)
- `message` (text, not null)
- `created_at` (timestamp, default now())

**testimonials** (optional):
- `id` (uuid, primary key)
- `name` (text, not null)
- `role` (text)
- `message` (text, not null)
- `avatar_url` (text)

### Row Level Security (RLS)
RLS MUST be enabled in Supabase dashboard:
- **projects, skills, testimonials**: Public read access
- **contacts**: Insert only (no public read)

### Client Usage
- Initialize Supabase client once in `services/supabase.js`
- Use `anon` key for public read operations
- Use `service_role` key for server-side inserts (bypass RLS)
- All queries MUST use `supabase.from('table').select()` or `.insert()` patterns

## API Endpoints Constitution

### Response Standards
- All responses MUST be JSON
- Use appropriate HTTP status codes: 200 (OK), 201 (Created), 400 (Bad Request), 500 (Server Error)
- Error responses MUST include descriptive messages

### Endpoint Specifications

**POST /api/contact**
- **Body**: `{ name: string, email: string, message: string }` (all required)
- **Validation**: Strict (non-empty, valid email format)
- **Flow**: Validate → Insert to `contacts` table → Send email notification → Return success
- **Response**: `{ success: true, message: "..." }`

**GET /api/projects**
- **Response**: Array of project objects
- **Query**: `SELECT * FROM projects`

**GET /api/skills**
- **Response**: Array of skill objects (optionally grouped by category)
- **Query**: `SELECT * FROM skills`

**GET /api/testimonials** (optional)
- **Response**: Array of testimonial objects
- **Query**: `SELECT * FROM testimonials`

## Email & Security Rules

### Email Configuration
- Use Nodemailer with Gmail, Resend, or SendGrid
- Configure via `EMAIL_USER` and `EMAIL_PASS` environment variables
- Send notification email on successful contact form submission
- Email MUST include: sender name, sender email, message content

### Security Requirements
- **CORS**: Allow only `FRONTEND_URL` origin (configure dynamically)
- **Input Validation**: All POST/PUT endpoints MUST validate inputs
- **Error Handling**: Global error middleware MUST catch and sanitize errors
- **No Console in Production**: `console.log` prohibited in production code paths

## General Governance

### Code Standards
- Use `async/await` for all asynchronous operations
- Wrap all async operations in `try-catch` blocks
- Use meaningful variable and function names
- Keep functions small and single-purpose

### Logging
- Development: `console.log` acceptable for debugging
- Production: Use structured logging (future: integrate proper logger like Pino/Winston)
- Never log sensitive data (credentials, tokens, passwords)

### Future Considerations
- **Authentication**: Supabase Auth with JWT verification for admin endpoints (future phase)
- **Rate Limiting**: `express-rate-limit` for production (optional, add if needed)
- **Monitoring**: Add logging/monitoring service if traffic increases

### Amendment Process
This constitution supersedes all other practices. Amendments require:
1. Clear justification for the change
2. Documentation of the amendment
3. Migration plan for existing code (if applicable)
4. Explicit approval before implementation

---

**Version**: 1.0.0 | **Ratified**: 2026-03-06 | **Last Amended**: 2026-03-06
