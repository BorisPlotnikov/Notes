// /src/hooks/useErrorHandler.js

import { useCallback } from 'react';
import rawErrorHandler from '../utils/errorHandler.js';

function useErrorHandler() {
    return useCallback((error, errorInfo = null) => {
            rawErrorHandler(error, errorInfo);
        }, []);
}

export default useErrorHandler;