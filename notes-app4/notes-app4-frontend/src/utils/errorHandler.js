const handleError = (setErrorMessage, userMessage, error) => {
    if (error.response) {
        const status = error.response.status;
        let detailedMessage = '';

        switch (status) {
            case 400:
                detailedMessage = 'Bad Request. Please check your input.';
                break;
            case 404:
                detailedMessage = 'Resource not found.';
                break;
            case 500:
                detailedMessage = 'Internal Server Error. Please try again later.';
                break;
            default:
                detailedMessage = 'An unexpected error occurred. please try again.';
        }

        console.error(`${userMessage}: ${detailedMessage}`, error.response.data);
        setErrorMessage(`${userMessage}: ${detaledMessage}`);
    } else if (error.request) {
        console.error(`${userMessage}: No response from the server.`, error.message);
        setErrorMessage(`${userMessage}: No response from the server. Please check your network.`);
    } else {
        console.error(`${userMessage}: ${error.message}`);
        setErrorMessage(`${userMessage}: ${error.message}`);
    }
};

export default handleError;