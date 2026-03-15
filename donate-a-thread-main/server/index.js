const express = require('express');
const cors = require('cors');
const cache = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const pickupRoutes = require('./routes/pickupRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pickups', pickupRoutes);

// Start Server with In-Memory Cache
const PORT = process.env.PORT || 5000;

function startServer() {
  console.log('Using in-memory cache storage...');
  console.log('Cache initialized with:', {
    users: cache.users.length,
    pickups: cache.pickups.length
  });

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Check if the --check flag is passed (for CI/CD health check)
    if (process.argv.includes('--check')) {
      console.log('Health check successful. Exiting...');
      server.close(() => {
        process.exit(0);
      });
    }
  });
}

startServer();
