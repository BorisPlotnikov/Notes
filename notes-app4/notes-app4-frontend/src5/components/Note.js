// Note.js
import React, { useState } from 'react';
import useNoteValidation from '../hooks/useNoteValidation';
import CharacterCounter from './CharacterCounter';
import PropTypes from 'prop-types';
import '../css/Note.css';

const Note = ({ id, noteContent, updateNote, loading }) => {
    const { content, trimmedContent, length, MAX_LENGTH, MIN_LENGTH, isNearMaxLength, handleChange } = useNoteValidation(noteContent);
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
                        aria-label="Edit note content"
                    />
                    <CharacterCounter
                        length={length}
                        MIN_LENGTH={MIN_LENGTH}
                        MAX_LENGTH={MAX_LENGTH}
                        isNearMaxLength={isNearMaxLength}
                    />
                    <button onClick={handleSave} disable={loading} aria-label="Save the note" type="button">Save</button>
                    <button onClick={handleCancel} disable={loading} aria-label="Cancel the editing" type="button">Cancel</button>
                </>
            ) : (
                <>
                    <p>{content}</p>
                    <button onClick={handleEdit} disabled={editing || loading} aria-label="Edit the note" type="button">Edit</button>
                </>
            )}
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