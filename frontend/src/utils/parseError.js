// utils/parseError.js

import {
    DEFAULT_USER_ERROR_MESSAGE,
    DEFAULT_LOG_ERROR_MESSAGE,
    STATUS_MESSAGES,
    NETWORK_ERROR_MESSAGE
} from '../constants/messages';

const parseError = (error = DEFAULT_USER_ERROR_MESSAGE, logMessage = DEFAULT_LOG_ERROR_MESSAGE) => {
    let userMessage = DEFAULT_USER_ERROR_MESSAGE;

    const checkStatus = (statusCode) => {
        return STATUS_MESSAGES[statusCode] || DEFAULT_USER_ERROR_MESSAGE;
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
            getUserMessage: () => NETWORK_ERROR_MESSAGE
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