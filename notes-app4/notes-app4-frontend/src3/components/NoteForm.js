import React, { useState } from 'react';
import handleError from '../utils/errorHandler';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, setMessage, loading }) => {

    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            handleError(setMessage, 'Empty content submission attempt');
            return;
        }
        try {
            await addNote(content);
            setContent('');
        } catch (err) {
            handleError(setMessage, 'Saving failed', err);
        };
    };


    return (
        <form onSubmit={handleSubmit} className='note-form'>
            <label htmlFor='note-content' className='sr-only'>Add a new note</label>
            <input
            type='text'
            value={content}
            onChange={(e) => {
                setContent(e.target.value);
            }}
            placeholder='Add a new note'
            aria-label='Note Content'
            />
            <button type='submit' disabled={!content || loading}>{loading ? 'Adding...' : 'Add'}</button>
        </form>
    );
};

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default NoteForm;