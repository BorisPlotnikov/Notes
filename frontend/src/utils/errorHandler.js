// utils/handleError.js

import parseError from './parseError';
import { DEFAULT_ERROR_MESSAGES } from '../constants'

const processError = (error, debugMessage = DEFAULT_ERROR_MESSAGES.LOG, setErrorMessage) => {
    const  { userMessage, logMessage, stack } = parseError(error, debugMessage);

    console.error(logMessage);
    if (stack) console.error(stack);

    if (typeof setErrorMessage === 'function') {
        setErrorMessage(userMessage);
    }
};

export default processError;