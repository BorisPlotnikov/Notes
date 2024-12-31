// CharacterCounter.js

import React from 'react';
import '../css/CharacterCounter.css';
import PropTypes from 'prop-types';

const CharacterCounter = ({ length, MIN_LENGTH = 1, MAX_LENGTH = 200, isNearMaxLength }) => {
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
    length: PropTypes.number.isRequired,
    MIN_LENGTH: PropTypes.number.isRequired,
    MAX_LENGTH: PropTypes.number.isRequired,
    isNearMaxLength: PropTypes.bool.isRequired
}

export default CharacterCounter;