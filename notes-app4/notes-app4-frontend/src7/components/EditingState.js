// EditingState.js

import React from 'react'; // Import React library for JSX syntax
import CharacterCounter from './CharacterCounter'; // Import CharacterCounter component to display character count
import { STATES } from '../constants/constants'; // Import STATES constant to manage different states (editing, display)
import '../css/EditingState.css'; // Import CSS specific to editing state styling
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Functional component for handling the "Editing" state of a note
const EditingState = ({
                        content, // Current content of the note being edited
                        handleChange, // Function to handle changes in the text area
                        trimmedContent, // The trimmed content (removes extra spaces)
                        handleSave, // Function to save the edited note
                        setState, // Function to change the state (edit -> display)
                        loading, // Boolean to indicate whether the app is in a loading state
                    }) => {

    return (
            <div className="textarea-container">
                {/* Textarea for editing the note */}
                <textarea
                    value={content} // The current content of the note
                    onChange={handleChange} // Handle input changes in the textarea
                    aria-label="Edit note content" // Accessibility label for screen readers
                />
                
                {/* Character counter displaying the number of characters entered */}
                <CharacterCounter content={trimmedContent} />
                
                {/* Button to save the changes */}
                <button
                    onClick={handleSave} // Handle save action
                    disabled={loading} // Disable button if loading
                    aria-label="Save the note" // Accessibility label for screen readers
                >
                    Save
                </button>
                
                {/* Button to cancel the editing and return to display state */}
                <button
                    onClick={() => setState(STATES.DISPLAY)} // Set state to display mode
                    disabled={loading} // Disable button if loading
                    aria-label="Cancel the editing" // Accessibility label for screen readers
                >
                    Cancel
                </button>
            </div>
    );
};

// Prop validation using PropTypes
EditingState.propTypes = {
    content: PropTypes.string.isRequired, // Content of the note being edited
    handleChange: PropTypes.func.isRequired, // Function to handle changes to content
    trimmedContent: PropTypes.string.isRequired, // The trimmed version of content
    handleSave: PropTypes.func.isRequired, // Function to save the edited content
    setState: PropTypes.func.isRequired, // Function to set the state of the component (editing/display)
    loading: PropTypes.bool.isRequired // Boolean to show loading state (e.g. disabling buttons)
};

export default EditingState; // Export the EditingState component
