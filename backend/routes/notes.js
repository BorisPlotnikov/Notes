// routes/notes.js

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const sendResponse = require('../helpers/sendResponse');

router.get('/', async (req, res, next) => {
    try {
        const notes = await Note.find();
        sendResponse(res, 200, notes);
    } catch (err) {
        return next(err);
    }
});

router.post('/', async (req, res, next) => {
    const note = new Note({
        content: req.body.content
    });
    try {
        const savedNote = await note.save();
        sendResponse(res, 201, savedNote);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:noteId', async (req, res, next) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
        
        if (!deletedNote) {
            return next({ status: 404, message: "Note not found" });
        }
        
        sendResponse(res, 200, deletedNote);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

