// utils/parseError.js

const defaultUserErrorMessage = 'An unexpected error occurred. Please try again.';

const getStack = (error) =>
    parseError.stackTraceEnabled && error?.stack ? error.stack : null;

function stringifyError(error) {
    try {
        if (typeof error === 'object' || typeof error === 'function') {
            return JSON.stringify(error);
        }
        return String(error);
    } catch {
        return 'Unknown error - failed to stringify.';
    }
}

function parseNullError() {
    return {
        devErrorMessage: 'No error provided to parseError.',
        code: 'INVALID_ERROR_OBJECT'
    };
}

function parseAxiosError(error) {
    const result = {
        userErrorMessage:
            typeof error.response?.data?.message === 'string'
                ? error.response.data.message
                : defaultUserErrorMessage,

        devErrorMessage:
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
        devErrorMessage:
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
        devErrorMessage: error,
        code: 'STRING_ERROR'
    };
}

function parseUnknownError(error) {
    return {
        devErrorMessage: stringifyError(error),
        code: 'UNKNOWN_ERROR_TYPE'
    };
}

const parseError = (error) => {
    const defaultValues = {
        name: 'PARSED_ERROR',
        userErrorMessage: defaultUserErrorMessage,
        devErrorMessage: 'Unknown error',
        code: 'UNKNOWN_ERROR'
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
