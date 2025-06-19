// routes/notes.js

import express from 'express';

import getNotes from './handlers/getNotes.js';
import createNote from './handlers/createNote.js';
import updateNote from './handlers/updateNote.js';
import deleteNote from './handlers/deleteNote.js';
const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);

export default router;

