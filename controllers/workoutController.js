const Exercise = require('../models/workoutModel');
const mongoose = require('mongoose');

// Get all exercises
const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single exercise
const getExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such exercise' });
  }

  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return res.status(404).json({ error: 'No such exercise' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new exercise
const createExercise = async (req, res) => {
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
    const exercise = await Exercise.create({ name, description, muscle_group, equipment_needed });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an exercise
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such exercise' });
  }

  try {
    const exercise = await Exercise.findOneAndDelete({ _id: id });
    if (!exercise) {
      return res.status(400).json({ error: 'No such exercise' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an exercise
const updateExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such exercise' });
  }

  try {
    const exercise = await Exercise.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!exercise) {
      return res.status(400).json({ error: 'No such exercise' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExercises,
  getExercise,
  createExercise,
  deleteExercise,
  updateExercise,
};
