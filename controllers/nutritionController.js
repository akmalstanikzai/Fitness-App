const Nutrition = require('../models/nutritionModel');
const mongoose = require('mongoose');

// Get all nutrition items
const getNutritions = async (req, res) => {
  try {
    const nutritions = await Nutrition.find({}).sort({ createdAt: -1 });
    res.status(200).json(nutritions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single nutrition item
const getNutrition = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such nutrition item' });
  }

  try {
    const nutrition = await Nutrition.findById(id);
    if (!nutrition) {
      return res.status(404).json({ error: 'No such nutrition item' });
    }
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new nutrition item
const createNutrition = async (req, res) => {
  const { name, serving_size, calories_per_serving, carbs_per_serving, proteins_per_serving, fats_per_serving, fiber_per_serving, sugars_per_serving } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!serving_size) {
    emptyFields.push('serving_size');
  }
  if (!calories_per_serving) {
    emptyFields.push('calories_per_serving');
  }
  if (!carbs_per_serving) {
    emptyFields.push('carbs_per_serving');
  }
  if (!proteins_per_serving) {
    emptyFields.push('proteins_per_serving');
  }
  if (!fats_per_serving) {
    emptyFields.push('fats_per_serving');
  }
  if (!fiber_per_serving) {
    emptyFields.push('fiber_per_serving');
  }
  if (!sugars_per_serving) {
    emptyFields.push('sugars_per_serving');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const nutrition = await Nutrition.create({ name, serving_size, calories_per_serving, carbs_per_serving, proteins_per_serving, fats_per_serving, fiber_per_serving, sugars_per_serving });
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a nutrition item
const deleteNutrition = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such nutrition item' });
  }

  try {
    const nutrition = await Nutrition.findOneAndDelete({ _id: id });
    if (!nutrition) {
      return res.status(400).json({ error: 'No such nutrition item' });
    }
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a nutrition item
const updateNutrition = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such nutrition item' });
  }

  try {
    const nutrition = await Nutrition.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!nutrition) {
      return res.status(400).json({ error: 'No such nutrition item' });
    }
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNutritions,
  getNutrition,
  createNutrition,
  deleteNutrition,
  updateNutrition,
};
