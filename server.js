const app = require('./src/app');
const config = require('./src/config');

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  console.log(`Product Catalog Service running on port ${PORT}`);
});

// Handle unexpected errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  // Graceful shutdown
  server.close(() => {
    process.exit(1);
  });
});