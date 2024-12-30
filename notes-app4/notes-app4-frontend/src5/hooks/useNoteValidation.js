// useNoteValidation.js
import { useState } from 'react';

const MAX_LENGTH = 200;
const MIN_LENGTH = 1;

const useNoteValidation = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);
    
    const trimmedContent = content.trim();
    const length = trimmedContent.length;
    
    const isContentValid = length >= MIN_LENGTH && length <= MAX_LENGTH;
    const isNearMaxLength = length >= MAX_LENGTH - 20;
    
    const handleChange = (e) => {
        setContent(e.target.value);
    };
    
    return {
        content, 
        setContent,
        trimmedContent,
        length,
        MAX_LENGTH,
        MIN_LENGTH,
        isNearMaxLength,
        isContentValid,
        handleChange
    };
};

export default useNoteValidation;
