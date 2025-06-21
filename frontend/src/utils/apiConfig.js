// utils/apiConfig.js

import { CONFIG_ERROR_MESSAGES } from '../constants';

const getApiBaseUrl =  () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    if (!apiBaseUrl) {
            throw new Error (CONFIG_ERROR_MESSAGES.MISSING_API_BASE_URL);
    }

    try {
        new URL(apiBaseUrl);
    } catch {
        throw new Error(CONFIG_ERROR_MESSAGES.INVALID_API_BASE_URL(apiBaseUrl));
    }

    return apiBaseUrl;
};

export { getApiBaseUrl };
