// helpers/sendResponse.js

// This module exports a function that sends a response with a specified status and data.
module.exports = (res, status, data) => {
    // Set the HTTP response status code (e.g., 200, 404, 500) and send the response as JSON
    res.status(status).json(data);
}
