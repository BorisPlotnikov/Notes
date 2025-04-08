// routes/notes.js

import express from 'express';
import getNotes from './handlers/getNotes.js'; // remove file extension
import createNote from './handlers/createNote.js'; // remove file extension
import deleteNote from './handlers/deleteNote.js'; // remove file extension
const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:noteId', deleteNote);

export default router;

