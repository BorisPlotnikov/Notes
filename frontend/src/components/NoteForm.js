// NoteForm.js

import React from 'react';
import useNoteValidation from '../hooks/useNoteValidation';
import { LENGTHS } from '../constants/constants';
import CharacterCounter from './CharacterCounter';
import handleError from '../utils/errorHandler';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, setErrorMessage, loading }) => {
    const {
        content, 
        setContent, 
        trimmedContent, 
        length, 
        isNearMaxLength, 
        isContentValid, 
        handleChange 
    } = useNoteValidation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await addNote(trimmedContent);
            setContent('');
        } catch (err) {
            handleError(setErrorMessage, 'Saving failed', err);
        };
    };

    return (
        <form onSubmit={handleSubmit} className='note-form' aria-busy={loading}>
            <label htmlFor='note-content' className='sr-only'>Add a new note</label>
            <input
                id="note-content"
                type="text"
                value={content}
                onChange={handleChange}
                placeholder={loading ? "Please wait..." : "Add a new note"}
                aria-label="Enter note content"
                aria-describedby="character-counter"
                maxLength={LENGTHS.MAX}
            />
            <CharacterCounter length={length} isNearMaxLength={isNearMaxLength} />
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
    setErrorMessage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default NoteForm;
