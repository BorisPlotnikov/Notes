// utils/handleError.js

import parseError from './parseError';

const processError = (error, debugMessage = 'An error occurred', setErrorMessage) => {
    const  { userMessage, logMessage, stack } = parseError(error, debugMessage);

    console.error(logMessage);
    if (stack) console.error(stack);

    if (typeof setErrorMessage === 'function') {
        setErrorMessage(userMessage);
    }
};

export default processError;