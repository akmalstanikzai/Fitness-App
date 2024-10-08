const express = require('express');
const multer = require('multer');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
}});

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// GET the image of a single workout
router.get('/:id/image', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout || !workout.image.data) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.set('Content-Type', workout.image.contentType);
    res.send(workout.image.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new workout with image upload
router.post('/', upload.single('image'), createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', upload.single('image'), updateWorkout);

module.exports = router;
