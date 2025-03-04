// CharacterCounter.js

import React from 'react'; // Import React library for JSX syntax
import { useNoteValidation } from '../hooks/useNoteValidation'; // Custom hook for note validation (to get length and validation)
import { LENGTHS } from '../constants/constants'; // Constant values for minimum and maximum note lengths
import '../css/CharacterCounter.css'; // Import the component's CSS file for styling
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Component to display note size feedback   
const CharacterCounter = ({ content = '' }) => {
    
    // Destructure the length and isNearMaxLength values from the custom hook useNoteValidation
    const {
        length, // The length of the trimmed content
        isNearMaxLength // Boolean indicating whether the content is nearing the max character limit
    } = useNoteValidation(content); // Pass content as a parameter to the custom hook

    return (
        <div
            id="character-counter" // ID for the character counter element
            className={`character-counter ${isNearMaxLength ? 'warning' : ''}`} // Apply 'warning' class if the content is near max length
            aria-live="polite" // Ensure that updates to this element are announced by screen readers politely
            aria-label="Character count" // Accessibility label for screen readers
        >
            {
                // Conditional rendering based on content length
                length < LENGTHS.MIN
                ?  `Minimum ${LENGTHS.MIN} characters` // Display a message if the content is too short
                : length >= LENGTHS.MAX
                ? `Maximum ${LENGTHS.MAX} characters` // Display a message if the content exceeds the max length
                : `${length}/${LENGTHS.MAX}` // Show the current character count and the max allowed
            }        
        </div>
    );
};

// PropTypes validation to enforce type-checking for the content prop
CharacterCounter.propTypes = {
    content: PropTypes.string // content should be a string
};

export default CharacterCounter; // Export the CharacterCounter component
