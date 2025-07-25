// Express app entry
const express = require('express');
const app = express();

// Middleware (body parser, etc.)
app.use(express.json());

// Import routes
const captchaRoutes = require('./routes/captchaRoutes');

// Use routes
app.use('/api/captcha', captchaRoutes);

// Export app for server.js
module.exports = app; 