// Note.js

import React, { useState } from 'react';
import DisplayState from './DisplayState';
import EditingState from './EditingState';
import useNoteValidation from '../hooks/useNoteValidation';
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

    return (
        <div className='note' aria-busy={loading} >
            {
                editing
                ? <EditingState
                        content={content}
                        handleChange={handleChange}
                        trimmedContent={trimmedContent}
                        handleSave={handleSave}
                        loading={loading}
                        setEditing={setEditing}
                    />
                : <DisplayState
                        setEditing={setEditing}
                        editing={editing}
                        noteContent={noteContent}
                        loading={loading}
                    />
            }
            <AccessibilityAlertRegion loading={loading} />
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