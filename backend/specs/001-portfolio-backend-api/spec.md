# Feature Specification: Portfolio Backend API

**Feature Branch**: `001-portfolio-backend-api`
**Created**: 2026-03-06
**Status**: Draft
**Input**: Portfolio Backend API with Supabase - Contact form, projects, skills, testimonials endpoints

## Overview

A secure, modern, scalable REST API server for the Bassam Shahid Portfolio website. The backend handles contact form submissions with email notifications and serves portfolio data (projects, skills, testimonials) to a Next.js frontend. Built with Node.js/Express and Supabase (PostgreSQL), deployed on serverless-friendly platforms.

## User Scenarios & Testing

### User Story 1 - Contact Form Submission (Priority: P1) 🎯 MVP

**As a** website visitor,  
**I want to** submit a contact form with my name, email, and message,  
**So that** Bassam receives my inquiry via email and I get a confirmation response.

**Why this priority**: This is the primary conversion mechanism for the portfolio - potential clients, recruiters, or collaborators need a way to reach out. Without this, the portfolio is purely informational with no call-to-action.

**Independent Test**: Can be fully tested by submitting a valid contact form and verifying: (1) success response received, (2) data persisted in database, (3) email notification sent.

**Acceptance Scenarios**:

1. **Given** valid contact form data (name, valid email, message 10+ chars), **When** user submits the form, **Then** system returns success message "Thanks! I'll get back soon." and sends email notification
2. **Given** invalid email format, **When** user submits the form, **Then** system returns 400 error with clear validation message
3. **Given** missing required fields (name, email, or message), **When** user submits, **Then** system returns 400 error specifying which fields are missing
4. **Given** message shorter than 10 characters, **When** user submits, **Then** system returns 400 error indicating minimum length requirement
5. **Given** server error (database unavailable), **When** user submits, **Then** system returns 500 error with generic error message (no internal details exposed)

---

### User Story 2 - View Projects Portfolio (Priority: P2)

**As a** portfolio visitor,  
**I want to** browse Bassam's projects with details like tech stack, live links, and GitHub links,  
**So that** I can evaluate his technical expertise and see real-world work examples.

**Why this priority**: Projects are the core evidence of capability. Visitors (especially recruiters and potential clients) need to see concrete examples of work to assess fit for their needs.

**Independent Test**: Can be fully tested by calling GET /api/projects and verifying: (1) returns array of project objects, (2) all required fields present, (3) projects sorted by recency.

**Acceptance Scenarios**:

1. **Given** projects exist in the database, **When** user requests projects endpoint, **Then** system returns array of all projects with id, title, description, tech_stack, live_link, github_link, image_url, category
2. **Given** empty projects table, **When** user requests projects endpoint, **Then** system returns empty array (not error)
3. **Given** projects with various categories, **When** user requests projects, **Then** system returns projects sorted by created_at descending (newest first)

---

### User Story 3 - View Skills by Category (Priority: P3)

**As a** visitor evaluating technical fit,  
**I want to** see Bassam's skills organized by category (Frontend, Backend, AI/Agentic, Tools),  
**So that** I can quickly understand his technical stack and areas of expertise.

**Why this priority**: Skills provide a quick snapshot of technical capabilities. Category grouping helps visitors find relevant skills efficiently (e.g., a frontend lead cares about Frontend category first).

**Independent Test**: Can be fully tested by calling GET /api/skills and verifying: (1) returns skills data, (2) skills include name and category fields, (3) response is valid JSON array.

**Acceptance Scenarios**:

1. **Given** skills exist in database, **When** user requests skills endpoint, **Then** system returns array of skills with name, category, and optional level
2. **Given** skills across multiple categories, **When** user requests skills, **Then** system returns all skills (frontend can group by category or backend can group in response)
3. **Given** empty skills table, **When** user requests skills endpoint, **Then** system returns empty array

---

### User Story 4 - View Testimonials (Priority: P4)

**As a** potential client or employer,  
**I want to** read testimonials from Bassam's previous collaborators,  
**So that** I can gauge his professionalism and work quality from third-party perspectives.

**Why this priority**: Social proof builds trust. Testimonials validate claims made elsewhere in the portfolio. Optional because not all portfolios have testimonials available.

**Independent Test**: Can be fully tested by calling GET /api/testimonials and verifying: (1) returns array of testimonial objects, (2) all required fields present (name, role, message), (3) optional avatar_url included when available.

**Acceptance Scenarios**:

1. **Given** testimonials exist in database, **When** user requests testimonials endpoint, **Then** system returns array with name, role/company, message, and optional avatar_url
2. **Given** empty testimonials table, **When** user requests testimonials, **Then** system returns empty array
3. **Given** testimonial without avatar, **When** user requests testimonials, **Then** system returns testimonial with null or omitted avatar_url field

---

### Edge Cases

- What happens when Supabase database is temporarily unavailable? → Return 500 error with generic message, log error for debugging
- How does system handle malformed JSON in request body? → Return 400 Bad Request with "Invalid JSON" message
- What happens if email service (Nodemailer) fails after successful database insert? → Log error, still return success to user (contact saved, email retry can be handled later)
- How are duplicate contact submissions handled? → Allowed (no deduplication - legitimate users may submit multiple inquiries)
- What happens with extremely long messages (10,000+ chars)? → Accept but consider adding max length (e.g., 2000 chars) to prevent abuse

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide POST /api/contact endpoint that accepts name (string, required), email (valid email format, required), and message (string, minimum 10 characters, required)
- **FR-002**: System MUST validate all contact form inputs using Joi or Zod schemas before processing
- **FR-003**: System MUST insert valid contact submissions into Supabase 'contacts' table with name, email, message, and created_at timestamp
- **FR-004**: System MUST send email notification to Bassam's email (configured via EMAIL_USER) upon successful contact form submission
- **FR-005**: System MUST return success response `{ success: true, message: "Thanks! I'll get back soon." }` after successful contact submission
- **FR-006**: System MUST return 400 Bad Request with descriptive error messages for validation failures
- **FR-007**: System MUST provide GET /api/projects endpoint returning array of all projects from 'projects' table
- **FR-008**: System MUST return projects with fields: id, title, description, tech_stack (array), live_link, github_link, image_url, category
- **FR-009**: System MUST return projects sorted by created_at descending (newest first)
- **FR-010**: System MUST provide GET /api/skills endpoint returning array of skills with name, category, and optional level
- **FR-011**: System MUST provide GET /api/testimonials endpoint returning array of testimonials with name, role/company, message, and optional avatar_url
- **FR-012**: System MUST return all responses as JSON with appropriate HTTP status codes (200, 201, 400, 500)
- **FR-013**: System MUST use environment variables for all sensitive configuration (Supabase credentials, email credentials, CORS origin)
- **FR-014**: System MUST implement global error handling middleware that catches unhandled errors and returns sanitized 500 responses
- **FR-015**: System MUST configure CORS to allow only the origin specified in FRONTEND_URL environment variable

### Key Entities

- **Contact**: Represents a contact form submission. Attributes: unique identifier, sender name, sender email, message content, submission timestamp
- **Project**: Represents a portfolio project showcase. Attributes: unique identifier, title, description, technologies used (list), live deployment URL, source code URL, preview image URL, category classification
- **Skill**: Represents a technical skill. Attributes: unique identifier, skill name, category (Frontend/Backend/AI/Agentic/Tools), proficiency level (optional)
- **Testimonial**: Represents a third-party endorsement. Attributes: unique identifier, author name, author role/company, testimonial message, author avatar image URL (optional)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Contact form submissions complete end-to-end (submit → database → email sent) in under 3 seconds for 95% of requests
- **SC-002**: All API endpoints return valid JSON responses with appropriate HTTP status codes (100% accuracy)
- **SC-003**: Invalid contact form submissions are rejected with clear validation error messages (100% of invalid inputs caught)
- **SC-004**: System handles 100 concurrent requests without degradation (no timeout errors, response times remain under 2 seconds)
- **SC-005**: Zero hardcoded credentials or secrets in source code (verified by code review and automated secret scanning)
- **SC-006**: All endpoints return within 500ms p95 latency under normal load (Supabase queries + email send)
- **SC-007**: Email notifications sent successfully for 99% of valid contact submissions (tracking via email service logs)

## Assumptions

1. Supabase project is already set up with required tables (contacts, projects, skills, testimonials) and RLS policies configured
2. Email service (Gmail/Resend/SendGrid) is configured and credentials are available
3. Frontend will call these APIs from a known origin (configured via FRONTEND_URL for CORS)
4. No authentication required for these public endpoints - Supabase RLS handles read/insert protection
5. Deployment target supports Node.js 20+ and environment variable configuration
6. Email notifications are best-effort (if email fails after database insert, user still sees success)

## Future Considerations (Out of Scope)

- Admin authentication and authorization for CRUD operations on projects/skills/testimonials
- Rate limiting on contact form endpoint to prevent spam
- File upload support for project images (currently using image_url strings)
- Search and filtering on projects endpoint (category filter, tech stack filter)
- Pagination for large datasets
- Analytics/tracking on API usage
- Contact form auto-reply emails to submitters
- Webhook integrations (e.g., Slack notifications for new contacts)
