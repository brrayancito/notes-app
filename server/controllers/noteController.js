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
    locals: {
      title: note.title,
    },
  });
};

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
