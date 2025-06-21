// constants/messages.js

export const DEFAULT_USER_ERROR_MESSAGE = 'An unexpected error occurred';
export const DEFAULT_LOG_ERROR_MESSAGE = 'An operation failed.';

export const STATUS_MESSAGES = {
    400: 'Bad Request. Please check your input.',
    401: 'Unauthorized. Please log in.',
    404: 'Resource not found.',
    408: 'Request timed out. Please check your network connection and try again.',
    500: 'Internal Server Error. Please try again later.',
};

export const NETWORK_ERROR_MESSAGE = 'No response from the server. Check your network.';
