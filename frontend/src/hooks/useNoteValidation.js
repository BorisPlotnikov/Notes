// useNoteValidation.js

// Import the useState hook from React for managing state
import { useState } from 'react';
// Import the LENGTHS constants from the constants file
import { LENGTHS } from '../constants/constants';

// Custom hook for tracking and validating the content of a note
const useNoteValidation = (initialContent = '') => {
    // State to store the current content of the note
    const [content, setContent] = useState(initialContent);    

    // Function to handle changes in the input field
    const handleChange = (e) => {
        // Update the content state with the new value from the input
        setContent(e.target.value);
    }

    // Trim any extra spaces from the content
    const trimmedContent = content.trim();
    // Calculate the length of the trimmed content
    const length = trimmedContent.length;

    // Check if the content is valid by comparing its length against the min and max allowed lengths
    const isContentValid = length >= LENGTHS.MIN && length <= LENGTHS.MAX;
    // Check if the content is nearing the maximum length (within 20 characters)
    const isNearMaxLength = length <= LENGTHS.MAX - 20;

    // Return an object containing all the values and functions needed to handle and validate the note content
    return {
        setContent,        // Function to update the content state
        content,           // The current content of the note
        trimmedContent,    // The content with leading/trailing spaces removed
        isContentValid,    // Boolean indicating whether the content length is valid
        length,            // The length of the trimmed content
        isNearMaxLength,   // Boolean indicating if the content is nearing the maximum allowed length
        handleChange       // Function to handle input changes
    };
};

// Export the custom hook for use in other parts of the application
export { useNoteValidation };
