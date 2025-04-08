// routes/handlers/createNote.js

import Note from '../../models/Note.js';
import sendResponse from '../../helpers/sendResponse.js';

export default async (req, res, next) => {
    const note = new Note({
        content: req.body.content
    });
    try {
        const savedNote = await note.save();
        sendResponse(res, 201, savedNote);
    } catch (err) {
        return next(err);
    }
};