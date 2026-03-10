# Bassam Shahid Portfolio Backend

Secure, modern, scalable REST API server for the Bassam Shahid Portfolio website. Built with Node.js/Express and Supabase (PostgreSQL).

## Features

- **Contact Form**: Submit inquiries with email notifications
- **Projects Portfolio**: Browse projects with tech stack, links, and categories
- **Skills**: View technical skills organized by category
- **Testimonials**: Read endorsements from clients and colleagues

## Tech Stack

- **Runtime**: Node.js 20+ (ESM modules)
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Validation**: Joi
- **Email**: Nodemailer (Gmail/Resend)
- **Security**: CORS, environment variables, RLS policies

## Quick Start

### Prerequisites

- Node.js 20+ installed
- Supabase account and project created
- Email service credentials

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
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

**contacts**:
- `id` (uuid, primary key)
- `name` (text, not null)
- `email` (text, not null)
- `message` (text, not null)
- `created_at` (timestamp, default now())

**projects**:
- `id` (uuid, primary key)
- `title` (text, not null)
- `description` (text, not null)
- `tech_stack` (jsonb)
- `live_link` (text)
- `github_link` (text)
- `image_url` (text, not null)
- `category` (text, not null)

**skills**:
- `id` (uuid, primary key)
- `name` (text, not null)
- `category` (text, not null)
- `level` (integer, optional)

**testimonials**:
- `id` (uuid, primary key)
- `name` (text, not null)
- `role` (text, not null)
- `message` (text, not null)
- `avatar_url` (text, optional)

### 4. Enable Row Level Security (RLS)

In Supabase Dashboard → Authentication → Policies:

```sql
-- Projects, skills, testimonials: Public read
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);

-- Contacts: Insert only
CREATE POLICY "Allow public insert" ON contacts FOR INSERT WITH CHECK (true);
```

### 5. Run Development Server

```bash
npm run dev
```

Server starts on `http://localhost:5000`

### 6. Test Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"This is a test message with enough length"}'

# Projects
curl http://localhost:5000/api/projects

# Skills
curl http://localhost:5000/api/skills

# Testimonials
curl http://localhost:5000/api/testimonials
```

## API Endpoints

### POST /api/contact

Submit contact form.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in working with you..."
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Thanks! I'll get back soon."
}
```

### GET /api/projects

Get all projects sorted by created_at descending.

**Response** (200):
```json
[
  {
    "id": "uuid",
    "title": "Project Name",
    "description": "Description...",
    "tech_stack": ["Node.js", "Express"],
    "live_link": "https://...",
    "github_link": "https://...",
    "image_url": "https://...",
    "category": "Web Development"
  }
]
```

### GET /api/skills

Get all skills grouped by category.

**Response** (200):
```json
{
  "Frontend": [
    { "name": "React", "category": "Frontend", "level": 90 }
  ],
  "Backend": [
    { "name": "Node.js", "category": "Backend", "level": 95 }
  ]
}
```

### GET /api/testimonials

Get all testimonials.

**Response** (200):
```json
[
  {
    "id": "uuid",
    "name": "Jane Smith",
    "role": "CEO at StartupXYZ",
    "message": "Bassam delivered exceptional work...",
    "avatar_url": "https://..."
  }
]
```

## Project Structure

```
backend/
├── server.js                  # Entry point
├── .env                       # Environment variables
├── .env.example               # Template
├── routes/                    # Express routers
│   ├── contact.js
│   ├── projects.js
│   ├── skills.js
│   └── testimonials.js
├── controllers/               # Business logic
│   ├── contactController.js
│   ├── projectsController.js
│   ├── skillsController.js
│   └── testimonialsController.js
├── services/                  # External services
│   └── supabase.js
├── utils/                     # Utilities
│   ├── email.js
│   └── validation.js
└── middleware/                # Middleware
    └── errorHandler.js
```

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard

### Render/Railway

1. Connect GitHub repository
2. Build command: `npm install`
3. Start command: `node server.js`
4. Add environment variables in dashboard

## Security

- Never commit `.env` files
- Use environment variables for all credentials
- Enable RLS policies in Supabase
- CORS restricted to frontend origin
- Input validation on all endpoints

## License

MIT
