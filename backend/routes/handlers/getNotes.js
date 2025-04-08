// routes/handlers/getNotes.js

import Note from '../../models/Note.js';
import sendResponse from '../../helpers/sendResponse.js';

export default async (req, res, next) => {
    try {
        const notes = await Note.find();
        sendResponse(res, 200, notes);
    } catch (err) {
        return next(err);
    }
};