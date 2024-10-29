const express = require('express');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// Protected route to get user profile
router.get('/profile', auth, (req, res) => {
  res.json(req.user);
});

// Admin-only dashboard route
router.get('/admin', auth, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

// Teacher-only route example
router.get('/teacher', auth, checkRole(['teacher']), (req, res) => {
  res.json({ message: 'Welcome to the teacher dashboard!' });
});

// Student-only route example
router.get('/student', auth, checkRole(['student']), (req, res) => {
  res.json({ message: 'Welcome to the student dashboard!' });
});

module.exports = router; 