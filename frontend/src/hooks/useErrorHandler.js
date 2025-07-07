// hooks/useErrorHandler.js

import { useCallback } from 'react';
import { parseError } from '../utils/parseError';
import { errorHandler } from '../utils/errorHandler';

function useErrorHandler() {
        const handleError = useCallback((error) => {
            const parsed = parseError(error);
            errorHandler(parsed);
        }
    , []);

    return handleError;
}

export default useErrorHandler;