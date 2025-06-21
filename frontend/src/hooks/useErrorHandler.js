// hooks/useErrorHandler.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { DEFAULT_ERROR_TIMEOUT } from '../constants';

import processError from '../utils/errorHandler';

const useErrorHandler = (timeout = DEFAULT_ERROR_TIMEOUT) => {
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (errorMessage && timeout > 0) {
            const timer = setTimeout(() => setErrorMessage(null), timeout);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, timeout]);

    const handleError = (error, debugMessage = 'An error occurred') => {
        // Ignore cancellations silently
        if (axios.isCancel?.(error)) return;
        processError(error, debugMessage, setErrorMessage);
    };

    return { errorMessage, setErrorMessage, handleError };
};

export default useErrorHandler;