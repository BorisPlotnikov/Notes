// useFetchNote.js

// Import necessary hooks and utilities
import { useEffect } from 'react';  // useEffect hook to trigger side effects
import useAbortController from '../hooks/useAbortController';  // Custom hook for handling abort signals in HTTP requests
import axios from 'axios';  // Axios library for making HTTP requests
import { getApiBaseUrl } from '../utils/apiConfig';  // Utility function to get the API base URL
import handleError from '../utils/errorHandler';  // Error handling function

// Custom hook to fetch notes from the API
const useFetchNotes = (setNotes, setErrorMessage, setLoading) => {
    // Destructure abort controller functions from the custom hook
    const { createAbortController, getSignal } = useAbortController();

    // useEffect hook to fetch notes when the component mounts
    useEffect(() => {
        // Async function to fetch notes from the server
        const fetchNotes = async () => {
            setLoading(true);  // Set loading state to true while fetching data
            createAbortController();  // Create a new abort controller for the request
            const apiBaseUrl = getApiBaseUrl();  // Get the base URL for the API from the environment variables

            try {
                // Send a GET request to fetch notes
                const response = await axios.get(
                    `${apiBaseUrl}/notes`,  // API endpoint for fetching notes
                    { signal: getSignal() }  // Attach the abort signal to the request for cancellation support
                );
    
                // If the response data is an array, set the notes in the state
                if (Array.isArray(response.data)) {
                    setNotes(response.data);
                } else {
                    // If the data format is unexpected, handle the error
                    handleError(setErrorMessage, 'Unexpected data format');
                }                
            } catch (err) {
                // Handle errors (e.g., request cancellation, failed download)
                handleError(
                    setErrorMessage,
                    axios.isCancel(err) ? 'Request canceled' : 'Downloading failed',  // Different message based on error type
                    err  // Pass the error object for logging and debugging
                );
            } finally {
                setLoading(false);  // Set loading state to false once the request is complete
            }
        };

        // Call the fetchNotes function to initiate the API request
        fetchNotes();
        
    }, []);  // Empty dependency array ensures the effect runs only once when the component mounts

};

// Export the custom hook for use in other components
export default useFetchNotes;
