// apiConfig.js

import handleError from '../utils/errorHandler';

const getApiBaseUrl =  (setErrorMessage) => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    if (!apiBaseUrl) {
        handleError(
            setErrorMessage,
            'API base URL is not defined in the environment variables. Please set `REACT_APP_API_BASE_URL` in your .env file.'
        );
        return null;
    }

    try {
        new URL(apiBaseUrl);
    } catch (err) {
        handleError(
            setErrorMessage,
            `Invalid API base URL: ${apiBaseUrl}`,
            err
        );
        return null;
    }

    return apiBaseUrl;
};

export { getApiBaseUrl };
