require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/product-catalog',
  MONGODB_DB_NAME: process.env.MONGODB_NAME || 'product_catalog',
  // Add other configuration variables as needed
};