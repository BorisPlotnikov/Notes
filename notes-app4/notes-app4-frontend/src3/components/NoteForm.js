import React, { useState } from 'react';
import handleError from '../utils/errorHandler';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, setMessage, loading }) => {

    const [content, setContent] = useState('');
    
    const MAX_LENGTH = 200;
    const MIN_LENGTH = 1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedContent = content.trim();

        try {
            await addNote(trimmedContent);
            setContent('');
        } catch (err) {
            handleError(setMessage, 'Saving failed', err);
        };
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_LENGTH && value !== content) {
            setContent(value);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className='note-form' aria-busy={loading}>
            <label htmlFor='note-content' className='sr-only'>Add a new note</label>
            <input
                id="note-content"
                type="text"
                value={content}
                onChange={handleChange}
                placeholder="Add a new note"
                aria-label="Enter note content"
                aria-describedby="character-counter"
                maxLength={MAX_LENGTH}
            />

            <div
                id="character-counter"
                className={`character-counter ${content.length >= MAX_LENGTH - 20 && 'warning'}`}
                aria-live="polite"
                aria-label="Character count"
            >
                {
                    trimmedContent.length > 0 && trimmedContent.length < MIN_LENGTH
                    ? `Minimum ${MIN_LENGTH} characters`
                    : trimmedContent.length >= MAX_LENGTH
                    ? `Maximum ${MAX_LENGTH} characters`
                    : `${trimmedContent.length}/${MAX_LENGTH}`
                }
            </div>
            <button type='submit' disabled={loading || trimmedContent.length < MIN_LENGTH || trimmedContent.length > MAX_LENGTH}>
                {loading ? 'Adding...' : 'Add'}
            </button>
        </form>
    );
};

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default NoteForm;