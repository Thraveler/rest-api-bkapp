const NoteModel = require('./note.model');
const mongoose = require('mongoose');

function getNotesByUser(idUser) {
  return NoteModel
    .find({userId: idUser})
    .exec();
}

function createNote(noteRecived) {

  const note = new NoteModel({
    _id: mongoose.Types.ObjectId(),
    title: noteRecived.title || 'Sin título',
    content: noteRecived.content || 'Sin contenido',
    userId: noteRecived.userId
  });

  return note.save();
  
}

function deleteNote(idNote) {
  return NoteModel.findByIdAndRemove(idNote).exec();
}

function updateNote(idNote, noteUpdated) {
  return NoteModel.findByIdAndUpdate(idNote, noteUpdated)
}

module.exports = {
  getNotesByUser,
  createNote,
  deleteNote,
  updateNote
}