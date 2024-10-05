import React, { useState } from 'react';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, errorMessage, setErrorMessage }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            addNote(content);
            setContent('');
        } else {
            setErrorMessage('Note content cannot be empty');
        }
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
            <button type='submit' disabled={!content.trim()}>Add</button>
        </form>
    );
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    setErrorMessage: PropTypes.func
};

export default NoteForm;