// Note.js

import React, { useState } from 'react'; // Import React and useState hook
import EditingState from './EditingState'; // Import the EditingState component for when the note is being edited
import DisplayState from './DisplayState'; // Import the DisplayState component for when the note is displayed
import AccessibilityAlertRegion from './AccessibilityAlertRegion'; // Import AccessibilityAlertRegion for ARIA live regions
import useNoteValidation from '../hooks/useNoteValidation'; // Import the custom hook for note validation
import { STATES } from '../constants/constants'; // Import constants for different states (EDITING, DISPLAY)
import PropTypes from 'prop-types'; // Import PropTypes for validating component props
import '../css/Note.css'; // Import CSS for the Note component styling

// Functional component to manage individual notes
const Note = ({ id, noteContent, updateNote, deleteNote, loading }) => {
    // Initialize content and validation functions from custom hook with the initial note content
    const { content, trimmedContent, handleChange } = useNoteValidation(noteContent);
    
    // Define the local state for managing the display or editing mode of the note
    const [state, setState] = useState(STATES.DISPLAY); // Default state is DISPLAY mode

    // Function to handle saving the updated note content
    const handleSave = () => {
        updateNote(id, trimmedContent); // Call the updateNote function passed as a prop to save changes
        setState(STATES.DISPLAY); // Change state to DISPLAY after saving
    };

    return (
        <div className='note' aria-busy={loading}>
            {/* ARIA live region for dynamic updates to the note */}
            <div aria-live="polite">
                {
                    // Conditionally render either the EditingState or DisplayState based on the current state
                    state === STATES.EDITING
                    ? <EditingState
                        content={content} // Pass the current content of the note
                        handleChange={handleChange} // Pass the handleChange function for content updates
                        trimmedContent={trimmedContent} // Pass the trimmed content for saving
                        handleSave={handleSave} // Pass the handleSave function to save the content
                        setState={setState} // Pass setState to change the state of the note
                        loading={loading} // Pass the loading state to handle UI feedback
                      />
                    : <DisplayState
                        content={content} // Pass the current content to be displayed
                        id={id} // Pass the note's ID
                        state={state} // Pass the current state of the note (DISPLAY or EDITING)
                        deleteNote={deleteNote} // Pass the deleteNote function to delete the note
                        setState={setState} // Pass setState to allow switching between DISPLAY and EDITING states
                        loading={loading} // Pass the loading state to display appropriate feedback
                      />
                }
            </div>

            {/* Accessibility alert region to announce changes for screen readers */}
            <AccessibilityAlertRegion loading={loading} aria-live="assertive" />
        </div>
    );
};

// Prop types validation for the Note component
Note.propTypes = {
    id: PropTypes.string.isRequired, // 'id' must be a string and is required
    noteContent: PropTypes.string.isRequired, // 'noteContent' must be a string and is required
    updateNote: PropTypes.func.isRequired, // 'updateNote' must be a function and is required
    deleteNote: PropTypes.func.isRequired, // 'deleteNote' must be a function and is required
    loading: PropTypes.bool.isRequired // 'loading' must be a boolean and is required
};

export default Note; // Export the Note component
