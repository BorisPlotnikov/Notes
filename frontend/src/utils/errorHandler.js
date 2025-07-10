// utils/handleError.js

import axios from 'axios';
import parseError from './parseError.js';

function errorHandler(error, errorInfo = null) {
    if (axios.isCancel?.(error)) return;
    const { userMessage = 'Something went wrong.', ...errorDetails } = parseError(error || {}, errorInfo || null);

    alert(userMessage);
    
    if (process.env.NODE_ENV === 'development') {
        console.error('Dev Error Details:', errorDetails);
    }
}

export default errorHandler;