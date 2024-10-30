import React, { useState, useEffect } from 'react';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, errorMessage, setErrorMessage, editNote, updateNote, processing, saving, adding }) => {
    const [noteContent, setNoteContent] = useState('');
    const [controller, setController] = useState(null);

    useEffect(() => {
        editNote && setNoteContent(editNote.noteContent);
    }, [editNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        controller && controller.abort();
        const newController = new AbortController();
        setController(newController);
        
        try {
            if (editNote) {
                await updateNote({ ...editNote, noteContent }, newController.signal);
                setNoteContent('');
            } else if ( noteContent.trim() ) {
                await addNote(noteContent, newController.signal);
                setNoteContent('');
            } else {
                handleError(setErrorMessage, 'Note content cannot be empty', new Error('Note content is empty'));
            }
        } catch (err) {
            handleError(setErrorMessage, `${editNote ? 'Editing' : 'Saving'} failed`, err);
        } finally {
            setController(null);
        }
    };

    useEffect(() => {
        return () => controller && controller.abort();
        }, [controller]);

    const buttonLabel = saving
    ? 'Saving...'
    : adding
    ? 'Adding...'
    : editNote
    ? 'Save'
    : 'Add'

    return (
        <form onSubmit={handleSubmit} className='note-form'>
            <input
            type='text'
            value={noteContent}
            onChange={(e) => {
                setNoteContent(e.target.value);
                errorMessage && setErrorMessage(null);
            }}
            placeholder='Add a new note'
            />
            <button type='submit' disabled={!noteContent.trim() || processing}>{buttonLabel}</button>
        </form>
    );
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    setErrorMessage: PropTypes.func,
    editNote: PropTypes.shape({
        id: PropTypes.string.isRequired,
        noteContent: PropTypes.string.isRequired
    }),
    updateNote: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    adding: PropTypes.bool.isRequired
};

export default NoteForm;