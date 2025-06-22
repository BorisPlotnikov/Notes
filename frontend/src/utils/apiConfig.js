// utils/apiConfig.js

import { ERROR_MESSAGES } from '../constants';

const getApiBaseUrl =  () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    if (!apiBaseUrl) {
            throw new Error (ERROR_MESSAGES.CONFIG.MISSING_API_BASE_URL);
    }

    try {
        new URL(apiBaseUrl);
    } catch {
        throw new Error(ERROR_MESSAGES.CONFIG.INVALID_API_BASE_URL(apiBaseUrl));
    }

    return apiBaseUrl;
};

export { getApiBaseUrl };
