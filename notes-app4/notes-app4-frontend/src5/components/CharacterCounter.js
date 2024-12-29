import React from 'react';

const CharacterCounter = ({ length, isNearMaxLength, MIN_LENGTH, MAX_LENGTH }) => {
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

export default CharacterCounter;