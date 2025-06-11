// hooks/useNoteContent.js

import { useState } from 'react';
import useNoteValidation from './useNoteValidation';

const useNoteContent = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);

    const onChange = (e) => setContent(e.target.value);

    const trimmedContent = content.trim();

    const contentLength = trimmedContent.length;

    const { isContentValid, isNearMaxLength } = useNoteValidation(contentLength);

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