// useAddNote.js

// Import necessary hooks and utilities
import useAbortController from '../hooks/useAbortController';  // Custom hook for handling abort signals in requests
import axios from 'axios';  // Axios library for making HTTP requests
import { v4 as uuidv4 } from 'uuid';  // UUID library to generate unique IDs for new notes
import { getApiBaseUrl } from '../utils/apiConfig';  // Utility function to get the API base URL
import handleError from '../utils/errorHandler';  // Error handling function

// Custom hook to add a new note
const useAddNote = (setNotes, setErrorMessage, setLoading) => {
    // Destructure abort controller functions from the custom hook
    const { createAbortController, getSignal } = useAbortController();

    // Function to add a new note
    const addNote = async (content) => {
        setLoading(true);  // Set loading state to true while the note is being added
        createAbortController();  // Create a new abort controller for the request
        const apiBaseUrl = getApiBaseUrl();  // Get the base URL for the API from the environment variables

        try {
            // Create a new note object with a unique ID and the provided content
            const newNote = { id: uuidv4(), content };
            // Send a POST request to the API to create a new note
            const response = await axios.post(
                `${apiBaseUrl}/notes`,  // API endpoint for adding a new note
                newNote,  // The new note data to send in the request body
                { signal: getSignal() }  // Attach the abort signal to the request for cancellation support
            );
            // Update the notes in the state by adding the new note to the list
            setNotes((prevNotes) => [...prevNotes, response.data]);
        } catch (err) {
            // Handle errors (e.g., request cancellation, failed save)
            handleError(
                setErrorMessage,
                // If the error is a canceled request, show "Request canceled"; otherwise, show a generic save failure message
                axios.isCancel(err) ? 'Request canceled' : 'Saving failed',
                err  // Pass the error object for logging and debugging
            );
        } finally {
            setLoading(false);  // Set loading state to false after the request is complete
        }
    };

    // Return the addNote function so it can be used by other components
    return { addNote };
};

// Export the custom hook for use in other components
export default useAddNote;
