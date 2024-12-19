// Function to handle erros and display user-friendly messages
const handleError = (
    setErrorMessage, // Function to update the error message state
    errorLog = `An operation failed.`, // Default log message when no specific error log is provided
    error = `No additional error data is available.` // Default error message when nospecific error is provided
) => {
    // Default message when an unknown error occurs
    let errorMessage = `An unexpected error occurred. Please try again later.`;

    // Helper function to map HTTP status codes to user-friendly messages
    const checkStatus = (statusCode) => {
        // Predefined status messages for common HTTP status codes
        const  statusMessages = {
            400: `Bad Request. Please check your input.`,
            401: `Unauthorized. Please log in.`,
            404: `Resource not found.`,
            408: `Request timed out. Please check your network connection and try again.`,
            500: `Internal Server Error. Please try again later.`
        };
        // Return the message for the given status code, or the default error message if not found
        return statusMessages[statusCode] || errorMessage;
    };
    // Array of error checks, each consisting of a condition and corresponding actions
    const errors = [
        {
            // Check if setErrorMessage is not a function
            check: () => typeof setErrorMessage !== 'function',
            // Log message when setErrorMessage is not a function
            statusLog: () => `${errorLog} setErrorMessage is not a function.`,
            // No error message in this case
            statusMessage: () => undefined
        },
        {
            // Check if the error is a string
            check: () => typeof error === 'string',
            // If it is a string, use it as the error message
            statusMessage: () => error
        },
        {
            // Check if the error has a response object with a status code
            check: () => error.response && error.response.status,
            // If the response status exists, get the corresponding message
            statusMessage: () => checkStatus(error.response.status)
        },
        {
            // Check if the error has a message property
            check: () => error.message,
            // Use the error's message if available
            statusMessage: () => error.message
        },
        {
            // Check if the error has a request property (indicating no response)
            check: () => error.request,
            // If no response was received, suggest checking the network
            statusMessage: () => `No response from the server. Check your network.`
        }
    ];
    // Iterate over the error checks and handle the first match
    for (let errorCheck of errors) {
        if (errorCheck.check()) {
            // If a matching check is found, log the appropriate message
            errorLog = errorCheck.statusLog ? errorCheck.statusLog() : errorLog;
            // Set the corresponding error message
            errorMessage = errorCheck.statusMessage();
            // Exit the lop once a match is found
            break;
        }
    }
    // Log the error message for debugging purposes
    console.error(errorLog);
    // If an error stack is available, log it as well for further debugging
    error.stack && console.error(error.stack);
    // Update the user with the friendly error message
    setErrorMessage(errorMessage);
};

// Export the handleError function as the default export of this module
export default handleError;