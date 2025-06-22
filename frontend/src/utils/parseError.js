// utils/parseError.js

import { ERROR_MESSAGES } from '../constants';

const parseError = (error = ERROR_MESSAGES.DEFAULT.USER, logMessage = ERROR_MESSAGES.DEFAULT.LOG) => {
    let userMessage = ERROR_MESSAGES.DEFAULT.USER;

    const checkStatus = (statusCode) => {
        return ERROR_MESSAGES.HTTP_STATUS[statusCode] || ERROR_MESSAGES.DEFAULT.USER;
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
            getUserMessage: () => ERROR_MESSAGES.NETWORK.NO_RESPONSE
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