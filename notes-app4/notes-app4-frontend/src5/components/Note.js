import React, { useState } from 'react';
import useNoteValidation from '../hooks/useNoteValidation';
import PropTypes from 'prop-types';
import '../css/Note.css';

const Note = ({ id, content, updateNote }) => {
    const { content, trimmedContent, length, MAX_LENGTH, MIN_LENGTH, isNearMaxLength, handleChange } = useNoteValidation(content);
    const [editing, setEditing] = useState(false);

    const handleEdit = () => setEditing(true);

    const handleSave = () => {
        updateNote(id, trimmedContent);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
    };


    return (
        <div className='note'>
            {editing ? (
                <>
                    <textarea
                        value={content}
                        onChange={handleChange}
                    />
                    <div
                        id="character-counter"
                        className={`character-counter ${isNearMaxLength ? 'warning' : ''}`}
                        aria-live="polite"
                        aria-label="Character count"
                    >
                        {length < MIN_LENGTH
                            ? `Minimum ${MIN_LENGTH} characters`
                            : length >= MAX_LENGTH
                            ? `Maximum ${MAX_LENGTH} characters`
                            : `${length}/${MAX_LENGTH}`
                        }
                    </div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <p>{content}</p>
                    <button onClick={handleEdit}>Edit</button>
                </>
            )}
        </div>
    );
};

Note.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    updateNote: PropTypes.func.isRequired
};

export default Note;