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

//Update Note
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

//Delete Note
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

//Add Note View
exports.addNoteView = async (req, res) => {
  res.render('dashboard/add-note', {
    title: 'Add Note',
    layout: '../views/layouts/dashboard',
  });
};
