// NoteForm.js

import React from 'react'; // Import React
import useNoteValidation from '../hooks/useNoteValidation'; // Custom hook for note content validation
import { LENGTHS } from '../constants/constants'; // Constants for note length validation
import CharacterCounter from './CharacterCounter'; // Component to display the character count
import handleError from '../utils/errorHandler'; // Utility for handling errors
import '../css/NoteForm.css'; // Import styles for the form
import PropTypes from 'prop-types'; // Import PropTypes for type-checking props

// NoteForm component for handling new note creation
const NoteForm = ({ addNote, setErrorMessage, loading }) => {
    // Destructure the validation-related properties and methods from the custom hook
    const { content, setContent, trimmedContent, length, isNearMaxLength, isContentValid, handleChange } = useNoteValidation();   

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        
        try {
            // Attempt to add a new note with the trimmed content
            await addNote(trimmedContent);
            setContent(''); // Clear the input field after successful submission
        } catch (err) {
            // If an error occurs, handle it by displaying an error message
            handleError(setErrorMessage, 'Saving failed', err);
        };
    };

    return (
        <form onSubmit={handleSubmit} className='note-form' aria-busy={loading}>
            {/* Label for the input field. Hidden for accessibility, but still useful for screen readers */}
            <label htmlFor='note-content' className='sr-only'>Add a new note</label>
            
            {/* Input field for entering the note content */}
            <input
                id="note-content" // Unique identifier for the input field
                type="text" // Input type set to text
                value={content} // Controlled input, value bound to state
                onChange={handleChange} // Event handler for input changes
                placeholder={loading ? "Please wait..." : "Add a new note"} // Conditional placeholder based on loading state
                aria-label="Enter note content" // Descriptive label for screen readers
                aria-describedby="character-counter" // Links to character counter for better accessibility
                maxLength={LENGTHS.MAX} // Limit the input length based on the constant MAX value
            />

            {/* Character counter component displaying current character count and warning */}
            <CharacterCounter length={length} isNearMaxLength={isNearMaxLength} />  
            
            {/* Submit button for adding the note */}
            <button
                type='submit' // Button type set to submit
                disabled={loading || !isContentValid} // Button disabled if loading is true or content is invalid
                aria-label={loading ? "Adding note..." : "Add a new note"} // Descriptive label for screen readers
            >
                {/* Conditional button text based on loading state */}
                {loading ? 'Adding...' : 'Add'}
            </button> 
        </form>
    );
};

// Prop types validation for the component's props
NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired, // 'addNote' must be a function
    setErrorMessage: PropTypes.func.isRequired, // 'setErrorMessage' must be a function
    loading: PropTypes.bool.isRequired // 'loading' must be a boolean
};

export default NoteForm; // Export the NoteForm component
