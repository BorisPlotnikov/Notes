// hooks/useNoteContent.js

import { useState, useEffect } from 'react';
import validateNoteContent from '../../../utils/validateNoteContent';

const useNoteContent = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);

    const validation = validateNoteContent(content);
    
    const onChange = (e) => setContent(e.target.value);

    useEffect(() => {
        // Keep internal state in sync with updated note content from props
        setContent(initialContent);
    }, [initialContent]);

    return {
        content,
        setContent,
        onChange,
        ...validation,
    };
};

export default useNoteContent;