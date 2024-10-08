require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const exerciseRoutes = require('./routes/workout');  // Import exercise routes

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/exercises', exerciseRoutes);  // Use exercise routes

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
