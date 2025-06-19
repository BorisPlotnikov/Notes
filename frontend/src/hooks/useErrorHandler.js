// hooks/useErrorHandler.js

import { useState, useEffect } from 'react';
import handleError from '../utils/handleError';

const useErrorHandler = (timeout = 5000) => {
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (errorMessage && timeout > 0) {
            const timer = setTimeout(() => setErrorMessage(null), timeout);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, timeout]);

    const processError = (error, log = 'An error occurred') => {
        handleError(error, log, setErrorMessage);
    };

    return { errorMessage, setErrorMessage, processError };
};


export default useErrorHandler;