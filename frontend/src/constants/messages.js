// constants/messages.js

export const ERROR_MESSAGES = {
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

export const EMPTY_STATE_MESSAGES = { // NoteList
    NO_NOTES: 'No notes available. Add a note to get started.',
};