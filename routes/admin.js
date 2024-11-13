const express = require('express');

// controller functions
const { loginAdmin, signupAdmin } = require('../controllers/adminController');

const router = express.Router();

// Admin routes
router.post('/login', loginAdmin);
router.post('/signup', signupAdmin);

module.exports = router;
