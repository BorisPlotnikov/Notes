// models/Note.js

import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

export default mongoose.model('Note', noteSchema);
