const express = require('express');
const router = express.Router();
const notesController = require('./notes.controller');

/* 
	HTTP Methods - /api/notes
*/

// POST
router.post('/notes', (req, res) => {

  notesController.createNote(req.body)
    .then(note => {
      res.status(201).json({
       statusCode: 201,
       message: "Nota creada",
       note: note
      });
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        message: "Hubo un error",
        error: err
      });
    });

});

/* 
	HTTP Methods - /api/users/:id
*/

// GET filter by userId
router.get('/notes/:idUser', (req, res) => {

  const userId = req.params.idUser;

  notesController.getNotesByUser(userId)
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch();

});

// DELETE
router.delete('/notes/:idNote', (req, res) => {

  let noteId = req.params.idNote;

  notesController.deleteNote(noteId)
    .then(result => {
      if(!result) res.status(200).json({
        statusCode: 200,
        message: 'Nota no existente'
      });

      res.status(200).json({
        statusCode: 200,
        message: 'Nota eliminada'
      });
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        message: 'Hubo un error',
        error: err
      });
    });

});

// PUT
router.put('/notes/:idNote', (req, res) => {

  let noteId = req.params.idNote;

  let note = {
    title: req.body.title || 'Sin título',
    content: req.body.content || 'Sin contenido',
    userId: req.body.userId
  }

  notesController.updateNote(noteId, note)
    .then(noteUpdated => {
      res.status(201).json({
        statusCode: 201,
        message: 'Nota actualizada',
        note: noteUpdated
      });
    })
    .catch();

});

module.exports = router;