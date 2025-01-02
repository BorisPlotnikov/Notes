// CharacterCounter.js

import React, { useState } from 'react';
import '../css/CharacterCounter.css';
import PropTypes from 'prop-types';

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

// ___________
const processing = (initialContent) => {
    const [content, setContent] = useState(initialContent);    
    
    const handleChange = (e) => {
        setContent(e.target.value);
    }
    
    const trimmedContent = content.trim();
    const length = trimmedContent.length;
    
    const isContentValid = length >= MIN_LENGTH && length <= MAX_LENGTH;
    const isNearMaxLength = length <= MAX_LENGTH - 20;
    
    return {
        setContent,
        content,
        trimmedContent,
        isContentValid,
        length,
        isNearMaxLength,
        handleChange
    };
};
// ___________
    
    const counter = () => {
        
        const {
            length,
            isNearMaxLength
        } = processing(initialContent = '');

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
    initalContent: PropTypes.string
};

export { counter,
            handleChange,
            setContent,
            content,
            trimmedContent,
            MIN_LENGTH,
            MAX_LENGTH,
            length,
            isContentValid,
            isNearMaxLength
        }