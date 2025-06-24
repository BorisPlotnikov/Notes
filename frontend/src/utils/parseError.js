// utils/parseError.js

import { ERROR_MESSAGES } from '../constants'; // Access to error messages

const parseError = (
    error = ERROR_MESSAGES.DEFAULT.USER,
    logMessage = ERROR_MESSAGES.DEFAULT.LOG
  ) => {
    const userMessage =
      typeof error === 'string' ? error
      : error?.response?.status ? ERROR_MESSAGES.HTTP_STATUS[error.response.status] || ERROR_MESSAGES.DEFAULT.USER
      : error?.message ? error.message
      : error?.request ? ERROR_MESSAGES.NETWORK.NO_RESPONSE
      : ERROR_MESSAGES.DEFAULT.USER;
  
    const stack = parseError.stackTraceEnabled ? error?.stack : undefined;
  
    return { userMessage, logMessage, stack };
  };
  
  parseError.stackTraceEnabled = true;
  

export default parseError;