const handleError = (setErrorMessage, errorSubject, error) => {
    let errorDescription;

    // Validate 'setErrorMessage' is a function
    errorDescription = 'Error: setErrorMessage is not a function.';
    if (typeof setErrorMessage !== 'function') {
        console.error(errorDescription);
        return;
    }

    // Default and validate 'errorSubject' to a string
    errorSubject = typeof errorSubject === 'string' ? errorSubject : 'An operation failed';

    // Handle string error
    if (typeof error === 'string') {
        errorDescription = error;
        console.error(`${errorSubject}: ${errorDescription}`);
        setErrorMessage(`${errorSubject}: ${errorDescription}`);
    } else if (error.message) {
    // Handle general JavaScript errors
        errorDescription = error.message;
        console.error(`${errorSubject}: ${errorDescription}`, error);
        setErrorMessage(`${errorSubject}: ${errorDescription}`);
    } else if (error.request) {
        // Handle no response error
        errorDescription = 'No response from the server. Please check your network';
        console.error(`${errorSubject}: ${errorDescription}`, error);
        setErrorMessage(`${errorSubject}: ${errorDescription}`);
    } else if (error.response) {
        // Check for specific HTTP status codes
        const statusMessages = {
            400: 'Bad Request. Please check your input.',
            404: 'Resource not found.',
            500: 'Internal Server Error. Please try again later.',
        };
        // Handle network-related errors
        errorDescription = statusMessages[error.response.status] || 'An unexpected error occurred. Please try again.';
        console.error(`${errorSubject}: ${errorDescription}`, error);
        setErrorMessage(`${errorSubject}: ${errorDescription}`);
    } else {
        //Handle any other unexpected cases
        errorDescription = 'An unexpected error occurred. Please try again.';
        console.error(`${errorSubject}: ${errorDescription}`, error);
        setErrorMessage(`${errorSubject}: ${errorDescription}`);
    }

};

export default handleError;