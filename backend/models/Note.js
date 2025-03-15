// models/Note.js

// Import mongoose, which is used to interact with MongoDB in Node.js applications
const mongoose = require('mongoose');

// Define a schema for the 'Note' model using mongoose.Schema
const noteSchema = new mongoose.Schema({
    // The 'content' field will store the actual note text
    content: {
        // The type of the 'content' field is a string
        type: String,
        // The 'required' field means the content is mandatory when creating a note
        required: true
    }
});

// Create and export a 'Note' model based on the defined 'noteSchema'
// The 'Note' model will be used to interact with the 'notes' collection in MongoDB
module.exports = mongoose.model('Note', noteSchema);
