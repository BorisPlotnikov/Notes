// hooks/useErrorHandler.js

import { useState } from 'react';
import handleError from '../utils/handleError';

const useErrorHandler = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const processError = (error, log = 'An error occurred') => {
        handleError(error, log, setErrorMessage);
    };

    return { errorMessage, setErrorMessage, processError };
};

export default useErrorHandler;