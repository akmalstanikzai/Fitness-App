const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  muscle_group: {
    type: String,
    required: true
  },
  equipment_needed: {
    type: String,
    required: false // Equipment might not be needed for some exercises
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
