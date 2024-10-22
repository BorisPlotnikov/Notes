import React, { useState, useEffect } from 'react';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, errorMessage, setErrorMessage, editNote, updateNote }) => {
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
            editNote ?
            await updateNote({ ...editNote, noteContent }, newController.signal) :
            noteContent.trim() ?
            await addNote(noteContent, newController.signal) :
            setErrorMessage('Note content cannot be empty');
        } catch (err) {
            handleError(setErrorMessage, editNote ? 'Editing failed' : 'Saving failed', err);
        } finally {
            setNoteContent('');
            setController(null);
        }
    };

    useEffect(() => {
        return () => controller && controller.abort();
        }, [controller]);

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
            <button type='submit' disabled={!noteContent.trim()}>{editNote ? 'save': 'Add'} Note</button>
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
    updateNote: PropTypes.func.isRequired
};

export default NoteForm;