import { useState, useMemo } from 'react';

const MAX_LENGTH = 200;
const MIN_LENGTH = 1;

const useNoteValidation = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);
    
    const trimmedContent = useMemo(() => content.trim(), [content]);
    const length = trimmedContent.length;
    
    const isContentValid = useMemo(() => length >= MIN_LENGTH && length <= MAX_LENGTH, [length]);
    const isNearMaxLength = useMemo(() => length >= MAX_LENGTH - 20, [length]);
    
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
