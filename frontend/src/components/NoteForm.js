// NoteForm.js

import React, { useState } from 'react';
import useNoteValidation from '../hooks/useNoteValidation';
import { LENGTHS } from '../constants/constants';
import CharacterCounter from './CharacterCounter';
import handleError from '../utils/errorHandler';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, setErrorMessage, loading, inputRef }) => {

    const [newContent, setNewContent] = useState("");    
    const trimmedContent = newContent.trim();
    const contentLength = trimmedContent.length;

    const onChange = (e) => setNewContent(e.target.value);

    const {
        isContentValid,
        isNearMaxLength,
    } = useNoteValidation(contentLength);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await addNote(trimmedContent);
            setNewContent('');
        } catch (err) {
            handleError(setErrorMessage, 'Saving failed', err);
        };
    };

    return (
        <form onSubmit={onSubmit} className='note-form' aria-busy={loading}>
            <label htmlFor='note-content' className='sr-only'>Add a new note</label>
            <div className="input-wrapper">
                <input
                    id="note-content"
                    type="text"
                    value={newContent}
                    onChange={onChange}
                    ref = {inputRef}
                    placeholder={loading ? "Please wait..." : "Add a new note"}
                    aria-label="Enter note content"
                    aria-describedby="character-counter"
                    maxLength={LENGTHS.MAX}
                />
                <CharacterCounter 
                    contentLength={contentLength} 
                    isNearMaxLength={isNearMaxLength} 
                />
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
    setErrorMessage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
};

export default NoteForm;
