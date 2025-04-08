// routes/handlers/deleteNote.js

import Note from '../../models/Note.js';
import sendResponse from '../../helpers/sendResponse.js';

export default async (req, res, next) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
        
        if (!deletedNote) {
            return next({ status: 404, message: "Note not found" });
        }
        
        sendResponse(res, 200, deletedNote);
    } catch (err) {
        return next(err);
    }
};