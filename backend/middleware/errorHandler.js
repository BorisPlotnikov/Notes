// middleware/errorHandler.js

// Import the 'http-errors' module, which helps to create HTTP errors with status codes
const createHttpError = require('http-errors');

// This middleware function handles errors in your Express app
module.exports = (err, req, res, next) => {
    // Check if the error is already an HTTP error (i.e., it has an 'isHttpError' property)
    // If it's not, create an HTTP error using the 'http-errors' module and set default status to 500 if not provided
    const error = err.isHttpError ? err : createHttpError(err.status || 500, err.message);

    // Set the HTTP response status code to the error's status code (e.g., 400, 404, 500)
    // Respond with a JSON object containing the error message
    res.status(error.status).json({ error: { message: error.message }});
}
