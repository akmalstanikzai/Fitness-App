require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workout');  // Import workout routes
const nutritionRoutes = require('./routes/nutritionRoutes');  // Import nutrition routes
const userRoutes = require('./routes/user');  // Import user routes
const adminRoutes = require('./routes/admin');  // Import admin routes

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);  // Use workout routes
app.use('/api/nutrition', nutritionRoutes);  // Use nutrition routes
app.use('/api/users', userRoutes);  // Use user routes
app.use('/api/admins', adminRoutes);  // Use admin routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
