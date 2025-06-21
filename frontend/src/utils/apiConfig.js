// utils/apiConfig.js

import { CONFIG_ERRORS } from '../constants';

const getApiBaseUrl =  () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    if (!apiBaseUrl) {
            throw new Error (CONFIG_ERRORS.MISSING_API_BASE_URL);
    }

    try {
        new URL(apiBaseUrl);
    } catch {
        throw new Error(CONFIG_ERRORS.INVALID_API_BASE_URL(apiBaseUrl));
    }

    return apiBaseUrl;
};

export { getApiBaseUrl };
