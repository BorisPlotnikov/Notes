// useUpdateNote.js

// Import custom hook for handling abort signal in requests
import useAbortController from '../hooks/useAbortController';
// Import axios for making HTTP requests
import axios from 'axios';
// Import utility function to retrieve the API base URL
import { getApiBaseUrl } from '../utils/apiConfig';
// Import error handling function to manage and log errors
import handleError from '../utils/errorHandler';

// Custom hook for updating notes
const useUpdateNote = (setNotes, setErrorMessage, setLoading) => {
    // Destructure functions from useAbortController hook
    const { createAbortController, getSignal } = useAbortController();

    // Function to update a specific note by its ID
    const updateNote = async (id, newContent) => {
        setLoading(true);  // Set loading state to true before making the request
        createAbortController();  // Create a new abort controller for the request
        const apiBaseUrl = getApiBaseUrl();  // Retrieve the API base URL from environment variables
        
        try {            
            // Make a PUT request to update the note with the specified ID and new content
            await axios.put(
                `${apiBaseUrl}/notes/${id}`,  // API endpoint for updating a note
                { content: newContent },  // Send the new content as part of the request body
                { signal: getSignal() }  // Attach the abort signal to the request to support cancellation
            );
            
            // Update the notes in the state by modifying the content of the updated note
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id ? { ...note, content: newContent } : note
                )
            );
        } catch (err) {
            // Handle errors using the handleError function
            handleError(
                setErrorMessage,
                // If the error is a canceled request, show "Request canceled"; otherwise, show a generic update failure message
                axios.isCancel(err) ? 'Request canceled' : 'Updating failed',
                err  // Pass the error object for logging and debugging
            );
        } finally {
            // Set loading state to false after the request is complete
            setLoading(false);
        }
    };

    // Return the updateNote function so it can be used by other components
    return { updateNote }
};

// Export the custom hook for use in other parts of the application
export default useUpdateNote;
