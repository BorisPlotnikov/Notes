// utils/apiConfig.js

const getApiBaseUrl =  () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    if (!apiBaseUrl) {
            throw new Error ('API base URL is not defined in the environment variables. Please set `REACT_APP_API_BASE_URL` in your .env file.');
    }

    try {
        new URL(apiBaseUrl);
    } catch (error) {
        throw new Error(`Invalid API base URL: ${apiBaseUrl}`);
    }

    return apiBaseUrl;
};

export { getApiBaseUrl };
