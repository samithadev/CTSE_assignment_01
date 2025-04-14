const rateLimit = require('express-rate-limit');
const config = require('../config');

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes by default
  max: config.RATE_LIMIT_MAX || 100, // limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    message: 'Too many requests, please try again later.'
  }
});

module.exports = {
  apiLimiter
};