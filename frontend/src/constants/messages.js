// constants/messages.js

export const DEFAULT_ERROR_MESSAGES = {
    USER: 'An unexpected error occurred',
    LOG: 'An operation failed.',
};

export const HTTP_STATUS_MESSAGES = {
    400: 'Bad Request. Please check your input.',
    401: 'Unauthorized. Please log in.',
    404: 'Resource not found.',
    408: 'Request timed out. Please check your network connection and try again.',
    500: 'Internal Server Error. Please try again later.',
};

export const STATUS_MESSAGES = {
    LOADING: 'Loading...',
    SAVED: 'Changes saved successfully.',
};

export const NETWORK_ERROR_MESSAGES = {
    NO_RESPONSE: 'No response from the server. Check your network.',
};

export const EMPTY_STATE_MESSAGES = {
    NO_NOTES: 'No notes available. Add a note to get started.',
};

export const CONTEXT_ERROR_MESSAGES = {
    NOTES: 'useNotes must be used within a NotesProvider'
};

export const DATA_ERROR_MESSAGES = {
    UNEXPEXTED_FORMAT: 'Unexpected data format',
};

export const CONFIG_ERROR_MESSAGES = {
    MISSING_API_BASE_URL: 
    'API base URL is not defined in the environment variables. ' + 
    'Please set "REACT_APP_API_BASE_URL" in your .env file',
    INVALID_API_BASE_URL: (value) => `Invalid API base URL: ${value}`,
};