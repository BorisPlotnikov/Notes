import React, { useState, useEffect } from 'react';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ 
    addNote,
    setErrorMessage
}) => {

    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addNote(content);
            setContent('');
        } catch (err) {
            handleError(setErrorMessage, 'Saving failed', err);
        } finally {

        }
    };


    return (
        <form onSubmit={handleSubmit} className='note-form'>
            <input
            type='text'
            value={content}
            onChange={(e) => {
                setContent(e.target.value);
            }}
            placeholder='Add a new note'
            />
            <button type='submit' disabled={!content}>Add</button>
        </form>
    );
};

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func
};

export default NoteForm;