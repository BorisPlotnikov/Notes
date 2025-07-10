// hooks/useErrorHandler.js

import { useCallback } from 'react';
import { errorHandler } from '../utils/errorHandler';

function useErrorHandler() {
        const handleError = useCallback((error) => {
            errorHandler(error);
        }
    , []);

    return handleError;
}

export default useErrorHandler;