// routes/handlers/updateNote.js
import Note from '../../models/Note.js';
import sendResponse from '../../helpers/sendResponse.js';

export default async (req, res, next) => {

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.noteId,
            { content: req.body.content },
            { new: true }
        );

        if (!updatedNote) {
            return next({ status: 404, message: "Note not found" });
        }

        sendResponse(res, 200, updatedNote);
    } catch (err) {
        return next(err);
    }
};