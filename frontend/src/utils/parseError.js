// src/utils/parseError.js

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

function mergeErrorData(defaults, parsed) {
    return {
        ...defaults,
        ...parsed,
        raw: {
            error: parsed.raw?.error ?? defaults.raw?.error ?? null,
            errorInfo: parsed.raw?.errorInfo ?? defaults.raw?.errorInfo ?? null
        }
    };
}

function parseNullError() {
    return {
        developerMessage: 'No error provided to parseError.',
        code: 'INVALID_ERROR_OBJECT',
        type: 'no error object'
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
                : 'UNKNOWN',

        type: 'axios'
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
                : 'UNKNOWN_JS_ERROR',

        type: 'js'
    };
}

function parseStringError(error) {
    return {
        developerMessage: error,
        code: 'STRING_ERROR',
        type: 'string'
    };
}

function parseUnknownError(error) {
    return {
        developerMessage: stringifyError(error),
        code: 'UNKNOWN_ERROR_TYPE',
        type: 'unknown'
    };
}

function parseBoundaryError(error, errorInfo) {
    return {
        name: error?.name || 'BOUNDARY_ERROR',
        developerMessage: error?.message || 'Unknown error in component.',
        code: 'REACT_COMPONENT_ERROR',
        type: 'react/boundary',
        componentStack: errorInfo?.componentStack?.trim() || null
    };
}

const parseError = (error, errorInfo = null) => {
    const defaultValues = {
        name: error?.name || 'PARSED_ERROR',
        userMessage: defaultUserMessage,
        developerMessage: 'Unknown error',
        code: 'UNKNOWN_ERROR',
        stack: getStack(error),
        raw: { error, errorInfo: errorInfo || null }
    };

    if (errorInfo) return mergeErrorData(defaultValues, parseBoundaryError(error, errorInfo));
    if (!error) return mergeErrorData(defaultValues, parseNullError());
    if (error.isAxiosError) return mergeErrorData(defaultValues, parseAxiosError(error));
    if (error instanceof Error) return mergeErrorData(defaultValues, parseJsError(error));
    if (typeof error === 'string') return mergeErrorData(defaultValues, parseStringError(error));
    return mergeErrorData(defaultValues, parseUnknownError(error));
};

parseError.stackTraceEnabled = process.env.NODE_ENV === 'development';

export default parseError;
