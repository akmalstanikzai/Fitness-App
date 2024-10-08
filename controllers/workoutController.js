const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({});
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new workout with an image
const createWorkout = async (req, res) => {
  const { name, description, muscle_group, equipment_needed } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!muscle_group) {
    emptyFields.push('muscle_group');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const workout = new Workout({ name, description, muscle_group, equipment_needed });

    if (req.file) {
      workout.image.data = req.file.buffer;
      workout.image.contentType = req.file.mimetype;
    }

    const savedWorkout = await workout.save();
    res.status(200).json(savedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(400).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!workout) {
      return res.status(400).json({ error: 'No such workout' });
    }

    if (req.file) {
      workout.image.data = req.file.buffer;
      workout.image.contentType = req.file.mimetype;
      await workout.save();
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
