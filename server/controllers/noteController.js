const Notes = require('../models/noteModel.js');

// Get Note
exports.getNote = async (req, res) => {
  const note = await Notes.findById(req.params.noteId).where({ user: req.user.id }).lean();

  if (!note) {
    return res.status(400).send('Note not found');
  }

  res.render('dashboard/view-note', {
    noteID: req.params.noteId,
    note,
    layout: '../views/layouts/dashboard',
    locals: {
      title: note.title,
    },
  });
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    await Notes.findOneAndUpdate(
      { _id: req.params.noteId },
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        runValidators: true,
      }
    ).where({ user: req.user.id });

    res.redirect('/dashboard');
  } catch (error) {
    res.send('Something went wrong');
    console.log(error);
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.noteId).where({ user: req.user.id });
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

// Create Note
exports.createNote = async (req, res) => {
  try {
    const note = await Notes.create({
      title: req.body.title,
      body: req.body.body,
      user: req.user.id,
    });

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

// Add Note View
exports.addNoteView = async (req, res) => {
  res.render('dashboard/add-note', {
    title: 'Add Note',
    layout: '../views/layouts/dashboard',
  });
};

// Search Notes
exports.searchNote = async (req, res) => {
  try {
    res.render('dashboard/search-note', {
      searchResults: '',
      title: 'Search Notes',
      layout: '../views/layouts/dashboard',
    });
  } catch (error) {
    console.log(error);
  }
};

// Search Notes Submit
exports.searchNoteSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const searchResults = await Notes.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChars, 'i') } },
      ],
    }).where({ user: req.user.id });

    res.render('dashboard/search-note', {
      searchResults,
      title: 'Search Notes',
      layout: '../views/layouts/dashboard',
    });
  } catch (error) {
    console.log(error);
  }
};
