// CharacterCounter.js

import React from 'react';
import { MIN_LENGTH, MAX_LENGTH, useNoteValidation } from '../hooks/useNoteValidation';
import '../css/CharacterCounter.css';
import PropTypes from 'prop-types';


// Component to display note size feedback   
const CharacterCounter = ({ content = '' }) => {
    
    const {
        length,
        isNearMaxLength
    } = useNoteValidation(content);

    return (
        <div
            id="character-counter"
            className={`character-counter ${isNearMaxLength ? 'warning' : ''}`}
            aria-live="polite"
            aria-label="Character count"
        >
            {length < MIN_LENGTH
                ?  `Minimum ${MIN_LENGTH} characters`
                : length >= MAX_LENGTH
                ? `Maximum ${MAX_LENGTH} characters`
                : `${length}/${MAX_LENGTH}`
            }        
        </div>
    );
};

CharacterCounter.propTypes = {
    content: PropTypes.string
};

export default CharacterCounter;