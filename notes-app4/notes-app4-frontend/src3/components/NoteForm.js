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
        if (!trimmedContent) {
            handleError(setMessage, 'An attempt to submit empty content');
            return;
        }


        if (trimmedContent.length < MIN_LENGTH || trimmedContent.length > MAX_LENGTH) {
            const message = trimmedContent.length < MIN_LENGTH
                ? `An attempt to submit less than ${MIN_LENGTH} characters.`
                : `An attempt to submit more than ${MAX_LENGTH} characters.`;
            handleError(setMessage, message);
            return;
        }        

        try {
            await addNote(trimmedContent);
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
                setContent(e.target.value.trimStart().trimEnd());
            }}
            placeholder='Add a new note'
            aria-label='Note Content'
            maxLength={MAX_LENGTH}
            />
            <div className={`character-counter ${content.length >= MAX_LENGTH - 20 ? 'warning' : ''}`} aria-live="polite">
                {content.length} / {MAX_LENGTH}
            </div>

            <button type='submit' disabled={loading || !content}>{loading ? 'Adding...' : 'Add'}</button>
        </form>
    );
};

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default NoteForm;