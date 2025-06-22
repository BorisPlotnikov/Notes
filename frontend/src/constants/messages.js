// constants/messages.js

export const ERROR_MESSAGES = {
    DEFAULT: {
        USER: 'An unexpected error occurred',
        LOG: 'An operation failed.',
    },
    HTTP_STATUS: {
        400: 'Bad Request. Please check your input.',
        401: 'Unauthorized. Please log in.',
        404: 'Resource not found.',
        408: 'Request timed out. Please check your network connection and try again.',
        500: 'Internal Server Error. Please try again later.',
    },
    NETWORK: {
        NO_RESPONSE: 'No response from the server. Check your network.',
    },
    CONTEXT: {
        NOTES: 'useNotes must be used within a NotesProvider'
    },
    DATA: {
        UNEXPECTED_FORMAT: 'Unexpected data format',
    },
    CONFIG: {
        MISSING_API_BASE_URL: 
        'API base URL is not defined in the environment variables. ' + 
        'Please set "REACT_APP_API_BASE_URL" in your .env file',
        INVALID_API_BASE_URL: (value) => `Invalid API base URL: ${value}`,
    },
};

export const STATUS_MESSAGES = {
    LOADING: 'Loading...',
};

export const EMPTY_STATE_MESSAGES = {
    NO_NOTES: 'No notes available. Add a note to get started.',
};