// server.js

// -----------------------------
// Entry Point of the Application
// -----------------------------

// Import the configured Express app
const app = require("./app");

// Set the port from environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;

/**
 * Start the server and listen on defined PORT
 */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
