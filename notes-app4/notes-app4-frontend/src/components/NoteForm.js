import React, { useState, useEffect } from 'react';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, errorMessage, setErrorMessage, editNote, updateNote={updateNote} }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editNote) {
            setContent(editNote.content);
        }
    }, [editNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editNote) {
            updateNote({ ...editNote, content });
        } else if (content.trim()) {
            addNote(content);
        } else {
            setErrorMessage('Note content cannot be empty');
        }
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className='note-form'>
            <input
            type='text'
            value={content}
            onChange={(e) => {
                setContent(e.target.value);
                if (errorMessage) setErrorMessage(null);
            }}
            placeholder='Add a new note'
            />
            <button type='submit' disabled={!content.trim()}>{editNote ? 'save': 'Add'} Note</button>
        </form>
    );
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    setErrorMessage: PropTypes.func,
    editNote: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }),
    updateNote: PropTypes.func.isRequired
};

export default NoteForm;