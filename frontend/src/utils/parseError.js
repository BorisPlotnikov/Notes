// utils/parseError.js

import {
    DEFAULT_ERROR_MESSAGES,
    HTTP_STATUS_MESSAGES,
    NETWORK_ERROR_MESSAGES,
} from '../constants';

const parseError = (error = DEFAULT_ERROR_MESSAGES.USER, logMessage = DEFAULT_ERROR_MESSAGES.LOG) => {
    let userMessage = DEFAULT_ERROR_MESSAGES.USER;

    const checkStatus = (statusCode) => {
        return HTTP_STATUS_MESSAGES[statusCode] || DEFAULT_ERROR_MESSAGES.USER;
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
            getUserMessage: () => NETWORK_ERROR_MESSAGES.NO_RESPONSE
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