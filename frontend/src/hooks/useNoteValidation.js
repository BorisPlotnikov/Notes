// useNoteValidation.js

import { useState } from 'react';
import { LENGTHS } from '../constants/constants';

const useNoteValidation = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);    

    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const trimmedContent = content.trim();
    const length = trimmedContent.length;

    const isContentValid = length >= LENGTHS.MIN && length <= LENGTHS.MAX;
    const isNearMaxLength = length <= LENGTHS.MAX - 20;

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

export default useNoteValidation;

