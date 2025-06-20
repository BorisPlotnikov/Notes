// utils/parseError.js

const parseError = (error = 'Unknown error', logMessage = 'An operation failed.') => {
    let userMessage = 'An unexpected error occurred';

    const checkStatus = (statusCode) => {
        const statusMessages = {
            400: 'Bad Request. Please check your input.',
            401: 'Unauthorized. Please log in.',
            404: 'Resource not found.',
            408: 'Request timed out. Please check your network connection and try again.',
            500: 'Internal Server Error. Please try again later.',
        };
        return statusMessages[statusCode] || userMessage;
    };

    const checks = [
        {
            check: () => typeof error === 'string',
            getUserMessage: () => error
        },
        {
            check: () => error?.response?.status,
            getUserMessage: () => checkStatus(error.response.status)
        },
        {
            check: () => error?.message,
            getUserMessage: () => error.message
        },
        {
            check: () => error?.request,
            getUserMessage: () => 'No response from the server. Check your network.'
        },
    ];

    for (const { check, getUserMessage } of checks) {
        if (check()) {
            userMessage = getUserMessage();
            break;
        }
    }

    return { userMessage, logMessage, stack: error?.stack };
};

export default parseError;