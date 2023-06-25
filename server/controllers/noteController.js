const Notes = require('../models/noteModel.js');

exports.getNote = async (req, res) => {
  const note = await Notes.findById(req.params.noteId).where({ user: req.user.id }).lean();

  if (!note) {
    return res.status(400).send('Note not found');
  }

  res.render('dashboard/view-note', {
    noteID: req.params.noteId,
    note,
    layout: '../views/layouts/dashboard',
  });
};

exports.createNote = async (req, res) => {};
