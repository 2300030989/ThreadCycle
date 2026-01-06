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

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
