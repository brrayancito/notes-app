const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController.js');
const checkAuth = require('../middlewares/checkAuth.js');
const noteController = require('../controllers/noteController.js');

// Dashboard Routes
router.get('/dashboard', checkAuth.isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/add-note', checkAuth.isLoggedIn, noteController.addNoteView);
router.post('/dashboard/add-note', checkAuth.isLoggedIn, noteController.createNote);
router.get('/dashboard/note/:noteId', checkAuth.isLoggedIn, noteController.getNote);
router.put('/dashboard/note/:noteId', checkAuth.isLoggedIn, noteController.updateNote);
router.delete('/dashboard/note-delete/:noteId', checkAuth.isLoggedIn, noteController.deleteNote);

module.exports = router;
