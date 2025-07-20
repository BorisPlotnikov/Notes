// hooks/useNoteContent.js

import { useState, useEffect } from 'react';

import { LENGTHS } from '../constants';

const useNoteContent = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        // Keep internal state in sync with updated note content from props
        setContent(initialContent);
    }, [initialContent]);

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