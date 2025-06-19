// config/corsOptions.js

/**
 * List of allowed client origins (domains) for cross-origin requests
 * - These should include your frontend URLs (production & development)
 */
const allowedOrigins = [
  "https://furniture-website-frontend-z6ro.onrender.com", // ✅ Production frontend
  "http://localhost:5173", // ✅ Local development frontend
];

/**
 * CORS configuration options
 * - Controls which origins are allowed to access your backend
 * - `credentials: true` allows cookies, authorization headers, etc.
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // ✅ Origin allowed
    } else {
      callback(new Error("❌ Not allowed by CORS")); // ❌ Origin denied
    }
  },
  credentials: true, // Allow sending cookies and auth headers across origins
};

module.exports = corsOptions;
