const express = require('express');
const {
  getNutritions,
  getNutrition,
  createNutrition,
  deleteNutrition,
  updateNutrition,
} = require('../controllers/nutritionController');

const router = express.Router();

// GET all nutrition items
router.get('/', getNutritions);

// GET a single nutrition item
router.get('/:id', getNutrition);

// POST a new nutrition item
router.post('/', createNutrition);

// DELETE a nutrition item
router.delete('/:id', deleteNutrition);

// UPDATE a nutrition item
router.patch('/:id', updateNutrition);

module.exports = router;
