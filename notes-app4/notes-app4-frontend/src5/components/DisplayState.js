// DisplaySTate.js

import React from 'react';
import useNoteValidation from '../hooks/useNoteValidation';

const RenderDisplayState = ({ setEditing, editing, noteContent, loading }) => {
    const { content } = useNoteValidation(noteContent);

    return (
        <>
            <p>{content}</p>
            <button
                onClick={() => setEditing(true)}
                disabled={editing || loading}
                aria-label="Edit the note"
            >
                Edit
            </button>
        </>
        
    );
};

export default RenderDisplayState;