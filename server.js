require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workout');  // Import workout routes
const nutritionRoutes = require('./routes/nutritionRoutes');  // Import nutrition routes
const userRoutes = require('./routes/user');  // Import user routes
const adminRoutes = require('./routes/admin');  // Import admin routes
const generatePlanController = require('./controllers/generatePlanController')  // Generate plan controller

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);  // Use workout routes
app.use('/api/nutrition', nutritionRoutes);  // Use nutrition routes
app.use('/api/users', userRoutes);  // Use user routes
app.use('/api/admins', adminRoutes);  // Use admin routes

// Route for generating plans
app.post('/api/generate-plan', generatePlanController.generatePlan);


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
