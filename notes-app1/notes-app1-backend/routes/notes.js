const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a note
router.post('/', async (req, res) => {
    const note  = new Note({
        content: req.body.content
    });
    try {
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (err) {
        res.json({ message: err });
    }
});

// Read all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a note
router.delete('/:noteId', async (req, res) => {
    try {
        const removedNote = await Note.findByIdAndDelete(req.params.noteId);
        if (!removedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(removedNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;