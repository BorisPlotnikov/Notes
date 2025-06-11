// hooks/useNoteContent.js

import { useState } from 'react';
import { LENGTHS } from '../constants/constants';

const useNoteContent = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);
    const onChange = (e) => setContent(e.target.value);
    const trimmedContent = content.trim();
    const contentLength = trimmedContent.length;
    const isContentValid = contentLength >= LENGTHS.MIN && contentLength <= LENGTHS.MAX;
    const isNearMaxLength = contentLength >= LENGTHS.MAX - 20;

    return {
        content,
        setContent,
        onChange,
        trimmedContent,
        contentLength,
        isContentValid,
        isNearMaxLength,
    };
};

export default useNoteContent;