const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
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
    type: String // Equipment might not be needed for some exercises
  },
  image: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
