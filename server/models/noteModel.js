const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
