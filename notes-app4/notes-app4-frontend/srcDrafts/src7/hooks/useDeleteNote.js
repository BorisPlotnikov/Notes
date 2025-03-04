// useDeleteNote.js

// Import necessary hooks and utilities
import useAbortController from '../hooks/useAbortController';  // Custom hook for handling abort signals in requests
import axios from 'axios';  // Axios library for making HTTP requests
import { getApiBaseUrl } from '../utils/apiConfig';  // Utility function to get the API base URL
import handleError from '../utils/errorHandler';  // Error handling function

// Custom hook to delete a note
const useDeleteNote = (setNotes, setErrorMessage, setLoading) => {   
    // Destructure abort controller functions from the custom hook
    const { createAbortController, getSignal } = useAbortController();

    // Function to delete a note by its ID
    const deleteNote = async (id) => {
        let backup;

        setLoading(true);  // Set loading state to true while deleting the note
        createAbortController();  // Create a new abort controller for the request
        const apiBaseUrl = getApiBaseUrl();  // Get the base URL for the API from the environment variables

        // Optimistically update the notes in the state by removing the deleted note
        setNotes(prevNotes => {
            backup = [...prevNotes];  // Make a backup of the previous state
            return prevNotes.filter(note => note.id !== id);  // Remove the note with the specified ID from the state
        });

        try {
            // Send a DELETE request to delete the note with the specified ID
            await axios.delete(
                `${apiBaseUrl}/notes/${id}`,  // API endpoint for deleting the note
                { signal: getSignal() }  // Attach the abort signal to the request for cancellation support
            );
        } catch (err) {
            // Handle errors (e.g., request cancellation, failed delete)
            handleError(
                setErrorMessage,
                // If the error is a canceled request, show "Request canceled"; otherwise, show a generic delete failure message
                axios.isCancel(err) ? 'Request canceled' : 'Deleting failed',
                err  // Pass the error object for logging and debugging
            );
            // Rollback the state change by restoring the backup of the notes
            setNotes(backup);
        } finally {
            setLoading(false);  // Set loading state to false after the request is complete
        }
    };

    // Return the deleteNote function so it can be used by other components
    return { deleteNote }
};

// Export the custom hook for use in other components
export default useDeleteNote;
