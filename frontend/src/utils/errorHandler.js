// /src/utils/errorHandler.js

import parseError from './parseError';

function errorHandler(error, errorInfo = null) {
    const { userMessage = 'Something went wrong.', ...errorDetails } = parseError(error || {}, errorInfo || null);

    alert(userMessage);
    
    if (process.env.NODE_ENV === 'development') {
        console.error('Dev Error Details:', errorDetails);
    }
}

export default errorHandler;