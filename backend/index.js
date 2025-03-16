// index.js

// Import the Express library to set up the server
const express = require('express');
const cors = require('cors');
const apiConfig = require('./utils/apiConfig');
// Create an instance of the Express application
const app = express();
app.use(cors());

// Import the routes for handling '/notes' endpoint
const notesRouter = require('./routes/notes');
// Import the custom error handler middleware
const errorHandler = require('./middleware/errorHandler');

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Set up the '/notes' route to use the notesRouter defined in 'routes/notes.js'
app.use('/notes', notesRouter);

// Use the error handler middleware to catch and handle errors
app.use(errorHandler);

// Define the port the server will listen on, using the environment variable or default to 3000
const PORT = apiConfig.port;

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    // Log a message indicating that the server is running and the port it's listening on
    console.log(`Server running on port ${PORT}`);
});