// apiConfig.js

// Import the error handling function to handle any errors that occur during the API configuration process
import handleError from '../utils/errorHandler';

// Function to get the API base URL from the environment variables
const getApiBaseUrl =  (setErrorMessage) => {
    // Retrieve the API base URL from environment variables
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Check if the API base URL is not defined in the environment variables
    if (!apiBaseUrl) {
        // Call the handleError function to handle the error and display a message
        handleError(
            setErrorMessage,
            'API base URL is not defined in the environment variables. Please set `REACT_APP_API_BASE_URL` in your .env file.'
        );
        return null;  // Return null if the API base URL is not set
    }

    try {
        // Try to create a new URL object to validate the API base URL format
        new URL(apiBaseUrl);
    } catch (err) {
        // If an error occurs (e.g., invalid URL format), call handleError to display the error message
        handleError(
            setErrorMessage,
            `Invalid API base URL: ${apiBaseUrl}`,
            err  // Pass the error object for logging and debugging
        );
        return null;  // Return null if the URL is invalid
    }

    // Return the API base URL if it's valid
    return apiBaseUrl;
};

// Export the getApiBaseUrl function to be used elsewhere in the application
export { getApiBaseUrl };
