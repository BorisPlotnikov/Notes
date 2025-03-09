// errorHandler.js

// Function to handle errors and display appropriate messages
const handleError = (
    setErrorMessage,  // Function to set the error message
    log = `An operation failed.`,  // Default log message if no specific message is provided
    error = `No additional error data is available.`  // Default error message
) => {
    let message = 'An unexpected error occured';

    // Function to check the status code and return a corresponding message
    const checkStatus = (statusCode) => {
        const statusMessages = {
            400: `Bad Request. Please check your input.`,
            401: `Unauthorized. Please log in.`,
            404: `Resource not found.`,
            408: `Request timed out. Please check your network connection and try again.`,
            500: `Internal Server Error. Please try again later.`
        };

        // Return the status message if found, else fallback to the default message
        return statusMessages[statusCode] || message;
    };

    // Array of error checks with associated handling logic for different error types
    const errors = [
        {
            // Check if setErrorMessage is not a function (invalid)
            check: () => typeof setErrorMessage !== 'function',
            statusLog: () => `${log} setErrorMessage is not a function.`,  // Log message for invalid setErrorMessage
            statusMessage: () => undefined  // No message if the function is invalid
        },
        {
            // Check if error is a string
            check: () => typeof error === 'string',
            statusMessage: () => error  // Use the provided string as the error message
        },
        {
            // Check if error has a response with a status code
            check: () => error.response && error.response.status,
            statusMessage: () => checkStatus(error.response.status)  // Return the appropriate status message based on the status code
        },
        {
            // Check if the error has a message property
            check: () => error.message,
            statusMessage: () => error.message  // Use the error's message property as the message
        },
        {
            // Check if the error has a request property (e.g., no response from server)
            check: () => error.request,
            statusMessage: () => `No response from the server. Check your network.`  // Generic message for no response
        }
    ];

    // Iterate through the error checks and handle the first matching error case
    for (let errorCheck of errors) {
        if (errorCheck.check()) {
            log = errorCheck.statusLog ? errorCheck.statusLog() : log;  // Set the log message if applicable
            message = errorCheck.statusMessage();  // Set the message based on the check
            break;  // Break after the first matching error is found
        }
    }

    // Log the error to the console and print the stack trace if available
    console.error(log);
    error.stack && console.error(error.stack);  // Log the stack trace if it exists

    // Set the error message using the provided setErrorMessage function
    setErrorMessage(message);
};

export default handleError;  // Export the handleError function for use in other parts of the application
