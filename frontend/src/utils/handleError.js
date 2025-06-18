// utils/handleError.js

import parseError from './parseError';

const handleError = (error, log = 'An error occured', setErrorMessage) => {
    const  { userMessage, logMessage, stack } = parseError(error, log);

    console.error(logMessage);
    if (stack) console.error(stack);

    if (typeof setErrorMessage === 'function') {
        setErrorMessage(userMessage);
    }
};

export default handleError;