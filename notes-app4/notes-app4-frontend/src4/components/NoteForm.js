import React, { useState } from 'react';
import handleError from '../utils/errorHandler';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const MAX_LENGTH = 200;
const MIN_LENGTH = 1;

const NoteForm = ({ addNote, setMessage, loading }) => {
    
    const [content, setContent] = useState('');
    
    const trimmedContent = useMemo(() => content.trim(), [content]);
    const length = trimmedContent.length;
    const isContentValid = useMemo(() => length >= MIN_LENGTH && length <= MAX_LENGTH, [length]);
    const isNearMaxLength = useMemo(() => length >= MAX_LENGTH - 20, [length]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await addNote(trimmedContent);
            setContent('');
        } catch (err) {
            handleError(setMessage, 'Saving failed', err);
        };
    };
    
    return (
        <form onSubmit={handleSubmit} className='note-form' aria-busy={loading}>
            <label htmlFor='note-content' className='sr-only'>Add a new note</label>
            <input
                id="note-content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={loading ? "Please wait..." : "Add a new note"}
                aria-label="Enter note content"
                aria-describedby="character-counter"
                maxLength={MAX_LENGTH}
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
            
            <button
                type='submit'
                disabled={loading || !isContentValid}
                aria-label={loading ? "Adding note..." : "Add a new note"}
            >
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