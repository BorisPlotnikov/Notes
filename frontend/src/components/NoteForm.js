// components/NoteForm.js

import React from 'react';

import { LENGTHS } from '../constants';
import useNoteContent from '../hooks/useNoteContent';
import { useNotes } from '../context/NotesContext';

import CharacterCounter from './CharacterCounter';
import '../css/NoteForm.css';

const NoteForm = () => {
    const {
        addNote,
        loading,
        inputRef,
        handleError,
    } = useNotes();

    const {
        content,
        setContent,
        trimmedContent,
        contentLength,
        isContentValid,
        isNearMaxLength,
        onChange,
    } = useNoteContent('');

    const onSubmit = async (e) => {
        e.preventDefault();       
        try {
            await addNote(trimmedContent);
            setContent('');
        } catch (error) {
            handleError(error, 'Saving failed.');
        };
    };

    return (
        <form onSubmit={onSubmit} className='note-form' aria-busy={loading}>
            <label htmlFor='note-content' className='sr-only'>Add a new note</label>
            <div className="input-wrapper">
                <input
                    id="note-content"
                    type="text"
                    value={content}
                    onChange={onChange}
                    ref={inputRef}
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

export default NoteForm;
