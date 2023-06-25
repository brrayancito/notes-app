const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController.js');
const checkAuth = require('../middlewares/checkAuth.js');
const noteController = require('../controllers/noteController.js');

// Dashboard Routes
router.get('/dashboard', checkAuth.isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/note/:noteId', checkAuth.isLoggedIn, noteController.getNote);
router.post('/dashboard/note/:noteId', checkAuth.isLoggedIn, noteController.createNote);

module.exports = router;
