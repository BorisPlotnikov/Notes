// errorHandler.js

const handleError = (
    setErrorMessage,
    log = `An operation failed.`,
    error = `No additional error data is available.`
) => {
    let message = 'An unexpected error occured';

    const checkStatus = (statusCode) => {
        const statusMessages = {
            400: `Bad Request. Please check your input.`,
            401: `Unauthorized. Please log in.`,
            404: `Resource not found.`,
            408: `Request timed out. Please check your network connection and try again.`,
            500: `Internal Server Error. Please try again later.`
        };

        return statusMessages[statusCode] || message;
    };

    const errors = [
        {
            check: () => typeof setErrorMessage !== 'function',
            statusLog: () => `${log} setErrorMessage is not a function.`,
            statusMessage: () => undefined
        },
        {
            check: () => typeof error === 'string',
            statusMessage: () => error
        },
        {
            check: () => error.response && error.response.status,
            statusMessage: () => checkStatus(error.response.status)
        },
        {
            check: () => error.message,
            statusMessage: () => error.message
        },
        {
            check: () => error.request,
            statusMessage: () => `No response from the server. Check your network.`
        }
    ];

    for (let errorCheck of errors) {
        if (errorCheck.check()) {
            log = errorCheck.statusLog ? errorCheck.statusLog() : log;
            message = errorCheck.statusMessage();
            break;
        }
    }

    console.error(log);
    error.stack && console.error(error.stack);

    setErrorMessage(message);
};

export default handleError;
