const handleError = (setErrorMessage, message1, error) => {
    if (error.response) {
        const status = error.response.status;
        let message2 = '';

        switch (status) {
            case 400:
                message2 = 'Bad Request. Please check your input.';
                break;
            case 404:
                message2 = 'Resource not found.';
                break;
            case 500:
                message2 = 'Internal Server Error. Please try again later.';
                break;
            default:
                message2 = 'An unexpected error occurred. please try again.';
        }

        console.error(`${message1}: ${message2}`, error.response.data);
        setErrorMessage(`${message1}: ${message2}`);
    } else if (error.request) {
        console.error(`${message1}: No response from the server.`, error.message);
        setErrorMessage(`${message1}: No response from the server. Please check your network.`);
    } else {
        console.error(`${message1}: ${error.message}`);
        setErrorMessage(`${message1}: ${error.message}`);
    }
};

export default handleError;