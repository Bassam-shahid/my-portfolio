import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Import routes
import contactRoutes from './routes/contact.js';
import projectsRoutes from './routes/projects.js';
import skillsRoutes from './routes/skills.js';
import testimonialsRoutes from './routes/testimonials.js';

// Load environment variables
dotenv.config();

// Debug: Log loaded environment variables (REMOVE IN PRODUCTION)
console.log('=== Environment Variables Loaded ===');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Set' : '✗ MISSING');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✓ Set (length: ' + process.env.SUPABASE_ANON_KEY.length + ')' : '✗ MISSING');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Set (length: ' + process.env.SUPABASE_SERVICE_ROLE_KEY.length + ')' : '✗ MISSING');
console.log('====================================');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`ERROR: Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please copy .env.example to .env and fill in the values.');
  process.exit(1);
}

// Validate Supabase URL format
if (!process.env.SUPABASE_URL.includes('https://') || !process.env.SUPABASE_URL.includes('.supabase.co')) {
  console.error('ERROR: SUPABASE_URL must be a valid Supabase URL (e.g., https://your-project.supabase.co)');
  process.exit(1);
}

// Validate Supabase keys are JWT format (start with eyJ)
if (!process.env.SUPABASE_ANON_KEY.startsWith('eyJ')) {
  console.error('ERROR: SUPABASE_ANON_KEY must be a valid JWT (starts with eyJ)');
  process.exit(1);
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY.startsWith('eyJ')) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY must be a valid JWT (starts with eyJ)');
  process.exit(1);
}

// Configure CORS - allow only specified frontend origin
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
// Explicit OPTIONS handler for preflight requests
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/testimonials', testimonialsRoutes);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log('');
  console.log('Available endpoints:');
  console.log('  GET  /health');
  console.log('  POST /api/contact');
  console.log('  GET  /api/projects');
  console.log('  GET  /api/skills');
  console.log('  GET  /api/testimonials');
});

export default app;
