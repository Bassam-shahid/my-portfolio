# Tasks: Portfolio Backend API

**Input**: Design documents from `/specs/001-portfolio-backend-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - not explicitly requested in the feature specification. This task list focuses on implementation tasks only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: All paths relative to `backend/` directory root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend directory structure (routes/, controllers/, services/, utils/, middleware/)
- [X] T002 [P] Initialize Node.js project with package.json (type: module)
- [ ] T003 [P] Install core dependencies: express, @supabase/supabase-js, nodemailer, joi, dotenv, cors
- [ ] T004 [P] Install dev dependencies: nodemon (for development server)
- [X] T005 [P] Create .env.example with placeholder keys (PORT, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, EMAIL_USER, EMAIL_PASS, FRONTEND_URL)
- [X] T006 [P] Add .env to .gitignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 [P] Create server.js entry point (Express app setup, middleware mounting, server listen)
- [X] T008 [P] Create services/supabase.js with singleton Supabase client initialization
- [X] T009 [P] Create middleware/errorHandler.js global error handling middleware
- [X] T010 [P] Create utils/validation.js with reusable validation helpers
- [X] T011 [P] Create utils/email.js with Nodemailer transporter setup and send function
- [X] T012 Configure CORS middleware to allow only FRONTEND_URL origin

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Contact Form Submission (Priority: P1) 🎯 MVP

**Goal**: Implement POST /api/contact endpoint with validation, database insert, and email notification

**Independent Test**: Can be fully tested by submitting a valid contact form and verifying: (1) success response received, (2) data persisted in database, (3) email notification sent

### Implementation for User Story 1

- [X] T013 [P] [US1] Create Joi validation schema for contact form in utils/validation.js (name, email, message with min/max lengths)
- [X] T014 [P] [US1] Create routes/contact.js with POST /api/contact route handler
- [X] T015 [US1] Create controllers/contactController.js with submitContact function
- [X] T016 [US1] Implement contact form validation logic in contactController.js (use Joi schema from T013)
- [X] T017 [US1] Implement Supabase insert to 'contacts' table in contactController.js (use service_role key)
- [X] T018 [US1] Implement email notification sending in contactController.js (call utils/email.js send function)
- [X] T019 [US1] Add error handling and JSON response formatting in contactController.js (400 for validation, 500 for server errors)
- [X] T020 [US1] Mount contact route in server.js (app.use('/api/contact', contactRoutes))

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Projects Portfolio (Priority: P2)

**Goal**: Implement GET /api/projects endpoint to return all projects sorted by recency

**Independent Test**: Can be fully tested by calling GET /api/projects and verifying: (1) returns array of project objects, (2) all required fields present, (3) projects sorted by created_at descending

### Implementation for User Story 2

- [X] T021 [P] [US2] Create routes/projects.js with GET /api/projects route handler
- [X] T022 [P] [US2] Create controllers/projectsController.js with getProjects function
- [X] T023 [US2] Implement Supabase query to fetch all projects from 'projects' table in projectsController.js
- [X] T024 [US2] Add ORDER BY created_at DESC to projects query in projectsController.js
- [X] T025 [US2] Add error handling and JSON response formatting in projectsController.js (200 for success, 500 for server errors)
- [X] T026 [US2] Mount projects route in server.js (app.use('/api/projects', projectsRoutes))

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Skills by Category (Priority: P3)

**Goal**: Implement GET /api/skills endpoint to return all skills with category grouping

**Independent Test**: Can be fully tested by calling GET /api/skills and verifying: (1) returns skills data, (2) skills include name and category fields, (3) response is valid JSON array

### Implementation for User Story 3

- [X] T027 [P] [US3] Create routes/skills.js with GET /api/skills route handler
- [X] T028 [P] [US3] Create controllers/skillsController.js with getSkills function
- [X] T029 [US3] Implement Supabase query to fetch all skills from 'skills' table in skillsController.js
- [X] T030 [US3] Add optional category grouping logic in skillsController.js (group by category field)
- [X] T031 [US3] Add error handling and JSON response formatting in skillsController.js (200 for success, 500 for server errors)
- [X] T032 [US3] Mount skills route in server.js (app.use('/api/skills', skillsRoutes))

**Checkpoint**: At this point, User Stories 1, 2, and 3 should all work independently

---

## Phase 6: User Story 4 - View Testimonials (Priority: P4)

**Goal**: Implement GET /api/testimonials endpoint to return all testimonials

**Independent Test**: Can be fully tested by calling GET /api/testimonials and verifying: (1) returns array of testimonial objects, (2) all required fields present (name, role, message), (3) optional avatar_url included when available

### Implementation for User Story 4

- [X] T033 [P] [US4] Create routes/testimonials.js with GET /api/testimonials route handler
- [X] T034 [P] [US4] Create controllers/testimonialsController.js with getTestimonials function
- [X] T035 [US4] Implement Supabase query to fetch all testimonials from 'testimonials' table in testimonialsController.js
- [X] T036 [US4] Add error handling and JSON response formatting in testimonialsController.js (200 for success, 500 for server errors)
- [X] T037 [US4] Mount testimonials route in server.js (app.use('/api/testimonials', testimonialsRoutes))

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T038 [P] Create .env file from .env.example and document setup in README
- [X] T039 [P] Add npm scripts to package.json (start, dev)
- [ ] T040 [P] Create quickstart.md with setup instructions (Supabase tables, RLS policies, environment variables)
- [X] T041 [P] Add basic health check endpoint GET /health in server.js
- [ ] T042 Test all endpoints with curl/Postman (contact form, projects, skills, testimonials)
- [X] T043 [P] Code cleanup and refactoring (remove console.log, ensure consistent error handling)
- [X] T044 [P] Verify no hardcoded credentials in source code (security review)
- [ ] T045 [P] Test CORS configuration with frontend origin

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 - Contact Form (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 - Projects (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 - Skills (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 - Testimonials (P4)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Models/schemas before controllers
- Controllers before routes
- Core implementation before mounting in server.js
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002-T006)
- All Foundational tasks marked [P] can run in parallel (T007-T011)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Within each user story, route and initial tasks marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1 (Contact Form)

```bash
# Launch validation and route creation together:
Task: "T013 [P] [US1] Create Joi validation schema for contact form in utils/validation.js"
Task: "T014 [P] [US1] Create routes/contact.js with POST /api/contact route handler"

# After both complete, continue with controller:
Task: "T015 [US1] Create controllers/contactController.js with submitContact function"
```

---

## Parallel Example: User Story 2 (Projects)

```bash
# Launch route and controller creation together:
Task: "T021 [P] [US2] Create routes/projects.js with GET /api/projects route handler"
Task: "T022 [P] [US2] Create controllers/projectsController.js with getProjects function"

# After both complete, continue with implementation:
Task: "T023 [US2] Implement Supabase query to fetch all projects from 'projects' table"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T012)
3. Complete Phase 3: User Story 1 - Contact Form (T013-T020)
4. **STOP and VALIDATE**: Test contact form endpoint independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Contact Form) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Projects) → Test independently → Deploy/Demo
4. Add User Story 3 (Skills) → Test independently → Deploy/Demo
5. Add User Story 4 (Testimonials) → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Contact Form)
   - Developer B: User Story 2 (Projects)
   - Developer C: User Story 3 (Skills)
   - Developer D: User Story 4 (Testimonials)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Total Tasks**: 45 (6 Setup + 6 Foundational + 8 US1 + 6 US2 + 6 US3 + 5 US4 + 8 Polish)
