/**
 * Global Error Handling Middleware
 * Catches unhandled errors and returns sanitized JSON responses
 */

/**
 * Express error handling middleware
 * @param {Error} err - Error object
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export function errorHandler(err, req, res, next) {
  // Log error for debugging (in production, use proper logger)
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Determine status code
  const statusCode = err.statusCode || err.status || 500;

  // Sanitize error message for production
  const message = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred. Please try again later.'
    : err.message;

  // Return JSON error response
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}

/**
 * Not Found Handler (404)
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: `Route ${req.method} ${req.path} not found`
  });
}

export default { errorHandler, notFoundHandler };
