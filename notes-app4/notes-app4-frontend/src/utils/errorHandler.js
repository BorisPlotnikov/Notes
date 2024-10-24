const handleError = (setErrorMessage, errorSubject, error) => {
    // Validate  'setErrorMessage' is a function
    if (typeof setErrorMessage !== 'function') {
        console.error('Error: setErrorMessage is not a function.');
        return;
    }

    // Default and validate 'errorSubject' to a string
    errorSubject = typeof errorSubject === 'string' ? errorSubject : 'An operation';

    // If error is not propvided or not an object, handle it as an unknown error
    if (!error || typeof error !== 'object') {
        console.error(`${errorSubject}: An unknown error occured.`);
        setErrorMessage(`${errorSubject}: An unknown error occurred.`);
        return;
    }

    // Handle different cases within the 'error' object
    if (error.response) {
        // Check for specific HTTP status codes
        const status = error.response.status;
        let errorReason = '';

        switch (status) {
            case 400:
                errorReason = 'Bad Request. Please check your input.';
                break;
            case 404:
                errorReason = 'Resource not found.';
                break;
            case 500:
                errorReason = 'Internal Server Error. Please try again later.';
                break;
            default:
                errorReason = 'An unexpected error occurred. please try again.';
        }

        console.error(`${errorSubject}: ${errorReason}`, error.response.data);
        setErrorMessage(`${errorSubject}: ${errorReason}`);
    } else if (error.request) {
        // Handle network-related errors
        console.error(`${errorSubject}: No response from the server.`, error.message);
        setErrorMessage(`${errorSubject}: No response from the server. Please check your network.`);
    } else if (error.message) {
        // Handle general JavaScript errors
        console.error(`${errorSubject}: ${error.message}`);
        setErrorMessage(`${errorSubject}: ${error.message}`);
    } else {
        //Handle any other unexpected cases
        console.error(`${errorSubject}: An unknown error occured.`);
        setErrorMessage(`${errorSubject}: An unknown error occured.`);
    }
};

export default handleError;