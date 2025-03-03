// useNoteValidation.js

import { useState } from 'react';

// Min/Max note size constants
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

// Custom hook for note size tracking
const useNoteValidation = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);    

    // Function to handle input
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

export { MIN_LENGTH, MAX_LENGTH, useNoteValidation };