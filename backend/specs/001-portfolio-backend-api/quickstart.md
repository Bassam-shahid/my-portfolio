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
- `id` (uuid, primary key, default: gen_random_uuid())
- `name` (text, not null)
- `email` (text, not null)
- `message` (text, not null)
- `created_at` (timestamp with time zone, default: now())

**projects**: 
- `id` (uuid, primary key, default: gen_random_uuid())
- `title` (text, not null)
- `description` (text, not null)
- `tech_stack` (jsonb, default: '[]'::jsonb)
- `live_link` (text)
- `github_link` (text)
- `image_url` (text, not null)
- `category` (text, not null)

**skills**: 
- `id` (uuid, primary key, default: gen_random_uuid())
- `name` (text, not null)
- `category` (text, not null)
- `level` (integer)

**testimonials**: 
- `id` (uuid, primary key, default: gen_random_uuid())
- `name` (text, not null)
- `role` (text, not null)
- `message` (text, not null)
- `avatar_url` (text)

### 4. Enable Row Level Security (RLS)

In Supabase Dashboard → Authentication → Policies:

**projects, skills, testimonials**:
```sql
CREATE POLICY "Allow public read access"
ON projects FOR SELECT
USING (true);
```

**contacts**:
```sql
CREATE POLICY "Allow public insert"
ON contacts FOR INSERT
WITH CHECK (true);
```

### 5. Seed Sample Data (Optional)

Insert sample projects, skills, and testimonials via Supabase SQL Editor or Table Editor.

### 6. Run Development Server

```bash
npm run dev
```

Server starts on `http://localhost:5000`

### 7. Test Endpoints

```bash
# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"This is a test message with enough length"}'

# Test projects endpoint
curl http://localhost:5000/api/projects

# Test skills endpoint
curl http://localhost:5000/api/skills

# Test testimonials endpoint
curl http://localhost:5000/api/testimonials
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

## Troubleshooting

### Contact form not sending email

- Verify EMAIL_USER and EMAIL_PASS are correct
- For Gmail: Enable 2FA and generate App Password
- Check Nodemailer transporter configuration

### Supabase connection errors

- Verify SUPABASE_URL format: `https://<project-ref>.supabase.co`
- Check SUPABASE_ANON_KEY and SERVICE_ROLE_KEY from Dashboard → Settings → API
- Ensure RLS policies are configured correctly

### CORS errors

- Verify FRONTEND_URL matches your frontend origin exactly
- Include protocol (http:// or https://)
