const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController.js');
const checkAuth = require('../middlewares/checkAuth.js');

// Dashboard Routes
router.get('/', checkAuth.isLoggedIn, dashboardController.dashboard);

module.exports = router;
