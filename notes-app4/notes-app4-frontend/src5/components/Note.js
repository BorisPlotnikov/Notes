// Note.js

import React, { useState } from 'react';
import useNoteValidation from '../hooks/useNoteValidation';
import CharacterCounter from './CharacterCounter';
import PropTypes from 'prop-types';
import '../css/Note.css';

// Functional component for managing individual notes
const Note = ({ id, noteContent, updateNote, loading }) => {
    const { content, trimmedContent, handleChange } = useNoteValidation(noteContent);
    const [editing, setEditing] = useState(false);

    // Handle saving the note content
    const handleSave = () => {
        updateNote(id, trimmedContent);
        setEditing(false);
    };

    // Render the editing state view with textarea and buttons
    const renderEditingState = () => (
        <div className="textarea-container">
            <textarea
                value={content}
                onChange={handleChange}
                aria-label="Edit note content"
            />
            <CharacterCounter content={trimmedContent} className="character-counter" />
            <button
                onClick={handleSave}
                disabled={loading}
                aria-label="Save the note"
            >
                Save
            </button>
            <button
                onClick={() => setEditing(false)}
                disabled={loading}
                aria-label="Cancel the editing"
            >
                Cancel
            </button>
        </div>
    );
    
    // Render the display state view with note content and edit button
    const renderDisplayState = () => (
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

    return (
        <div className='note' aria-busy={loading} >
            {editing ? renderEditingState() : renderDisplayState()}

            {/* Accessibility alert region */}
            <div
                className="sr-only"
                aria-live="polite"
                aria-relevant="additions text"
                style={{ position: 'absolute', left: '-9999px' }}
            >
                {loading ? 'Loading...' : 'Changes saved successfully.'}
            </div>
        </div>
    );
};

Note.propTypes = {
    id: PropTypes.string.isRequired,
    noteContent: PropTypes.string.isRequired,
    updateNote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Note;