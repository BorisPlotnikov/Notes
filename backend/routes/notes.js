// routes/notes.js

// Import necessary modules
const express = require('express'); // Express framework to create the routing
const router = express.Router(); // Create a new router instance for this file's routes
const Note = require('../models/Note'); // Import the 'Note' model to interact with the database
const sendResponse = require('../helpers/sendResponse'); // Utility function to send standardized responses

// Route to get all notes (Read all notes)
router.get('/', async (req, res, next) => {
    try {
        // Fetch all notes from the database using the 'find' method
        const notes = await Note.find();
        // Send the response with a 200 status code and the list of notes
        sendResponse(res, 200, notes);
    } catch (err) {
        // If an error occurs, pass it to the next middleware (error handler)
        return next(err);
    }
});

// Route to create a new note (Create a note)
router.post('/', async (req, res, next) => {
    // Create a new Note instance with the content provided in the request body
    const note = new Note({
        content: req.body.content
    });
    try {
        // Save the new note to the database
        const savedNote = await note.save();
        // Send a 201 status code with the saved note in the response
        sendResponse(res, 201, savedNote);
    } catch (err) {
        // If an error occurs, pass it to the next middleware (error handler)
        return next(err);
    }
});

// Route to delete a note (Delete a note by ID)
router.delete('/:noteId', async (req, res, next) => {
    try {
        // Find and delete the note by its ID from the URL parameter
        const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
        
        // If the note doesn't exist, return a 404 error with a custom message
        if (!deletedNote) {
            return next({ status: 404, message: "Note not found" });
        }
        
        // Send a 200 status code and the deleted note in the response
        sendResponse(res, 200, deletedNote);
    } catch (err) {
        // If an error occurs, pass it to the next middleware (error handler)
        return next(err);
    }
});

// Export the router so it can be used in the main app
module.exports = router;
