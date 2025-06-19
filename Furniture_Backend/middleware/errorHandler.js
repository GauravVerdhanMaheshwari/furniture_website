/**
 * @desc    Express error-handling middleware
 * @param   {Object} err - The error object
 * @param   {Object} req - The HTTP request
 * @param   {Object} res - The HTTP response
 * @param   {Function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log the full error stack for debugging (disable in production if needed)
  console.error("🔴 Error Stack Trace:", err.stack);

  // Set default status code to 500 if not already set
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Optional: add stack trace in development only
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
