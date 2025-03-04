// DisplayState.js

import React from 'react'; // Import React library for JSX syntax
import { STATES } from '../constants/constants'; // Import STATES constant to handle different note states (editing, display)
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Functional component for displaying a note's content and options to edit or delete it
const DisplayState = ({
    content, // Content of the note to be displayed
    id, // Unique identifier of the note
    state, // Current state of the note (editing or display)
    deleteNote, // Function to delete the note
    setState, // Function to change the state (edit -> display)
    loading // Boolean to indicate whether the app is in a loading state
}) => {

    return (
        <>
            {/* Display the content of the note */}
            <p>{content}</p>
            
            {/* Button to delete the note */}
            <button
                onClick={() => deleteNote(id)} // Trigger deleteNote function with the note id
                disabled={loading} // Disable button when loading
                aria-label="delete the note" // Accessibility label for screen readers
            >
                Delete
            </button>
            
            {/* Button to edit the note, only active if the note isn't already in editing state */}
            <button
                onClick={() => setState(STATES.EDITING)} // Set state to editing mode to start modifying the note
                disabled={state === STATES.EDITING || loading} // Disable button if already in editing state or loading
                aria-label="Edit the note" // Accessibility label for screen readers
            >
                Edit
            </button>
        </>
    );
};

// Prop validation using PropTypes
DisplayState.propTypes = {
    content: PropTypes.string.isRequired, // Content of the note being displayed
    id: PropTypes.string.isRequired, // Unique identifier for the note
    state: PropTypes.oneOf([STATES.EDITING, STATES.DISPLAY]).isRequired, // Ensure state is either editing or display
    deleteNote: PropTypes.func.isRequired, // Function to handle note deletion
    setState: PropTypes.func.isRequired, // Function to set the state of the note (editing/display)
    loading: PropTypes.bool.isRequired // Boolean to indicate if the application is in a loading state
};

export default DisplayState; // Export the DisplayState component
