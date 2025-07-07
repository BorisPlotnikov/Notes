// utils/parseError.js

import safeStringify from 'fast-safe-stringify';

const defaultUserMessage = 'An unexpected error occurred. Please try again.';

const getStack = (error) =>
    parseError.stackTraceEnabled && error?.stack ? error.stack : null;

function stringifyError(error) {
    try {
        if (typeof error === 'object' || typeof error === 'function') {
            return safeStringify(error, null, 2);
        }
        return String(error);
    } catch {
        return 'Unknown error - failed to stringify.';
    }
}

function parseNullError() {
    return {
        developerMessage: 'No error provided to parseError.',
        code: 'INVALID_ERROR_OBJECT'
    };
}

function parseAxiosError(error) {
    const result = {
        userMessage:
            typeof error.response?.data?.message === 'string'
                ? error.response.data.message
                : defaultUserMessage,

        developerMessage:
            error.message || 'Axios/HTTP error occurred.',

        code:
            typeof error.response?.data?.code === 'string'
                ? error.response.data.code
                : 'UNKNOWN'
    };

    if (typeof error.response?.status === 'number') {
        result.status = error.response.status 
    }
    
    if (error.config) {
        result.config = error.config;
    }

    return result;
}

function parseJsError(error) {
    return {
        developerMessage:
            typeof error.message === 'string'
                ? error.message
                : 'Unknown JavaScript error: no message provided.',

        code:
            typeof error.name === 'string'
                ? error.name.toUpperCase()
                : 'UNKNOWN_JS_ERROR'
    };
}

function parseStringError(error) {
    return {
        developerMessage: error,
        code: 'STRING_ERROR'
    };
}

function parseUnknownError(error) {
    return {
        developerMessage: stringifyError(error),
        code: 'UNKNOWN_ERROR_TYPE'
    };
}

const parseError = (error) => {
    const defaultValues = {
        name: error?.name || 'PARSED_ERROR',
        userMessage: defaultUserMessage,
        developerMessage: 'Unknown error',
        code: 'UNKNOWN_ERROR',
        raw: error
    };

    const stack = getStack(error);

    if (!error) return { ...defaultValues, ...parseNullError(), stack };
    if (error.isAxiosError) return { ...defaultValues, ...parseAxiosError(error), stack };
    if (error instanceof Error) return { ...defaultValues, ...parseJsError(error), stack };
    if (typeof error === 'string') return { ...defaultValues, ...parseStringError(error), stack };

    return { ...defaultValues, ...parseUnknownError(error), stack };
};

parseError.stackTraceEnabled = process.env.NODE_ENV === 'development';

export default parseError;
