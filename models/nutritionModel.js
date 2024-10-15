const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  serving_size: {
    type: String,
    required: true
  },
  calories_per_serving: {
    type: Number,
    required: true
  },
  carbs_per_serving: {
    type: Number,
    required: true
  },
  proteins_per_serving: {
    type: Number,
    required: true
  },
  fats_per_serving: {
    type: Number,
    required: true
  },
  fiber_per_serving: {
    type: Number,
    required: true
  },
  sugars_per_serving: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Nutrition', nutritionSchema);
