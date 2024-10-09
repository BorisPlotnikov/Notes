import React, { useState, useEffect } from 'react';
import ErrorNotification from './components/ErrorNotification';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, errorMessage, setErrorMessage, editNote, updateNote }) => {
    const [noteContent, setNoteContent] = useState('');
    const [controller, setController] = useState(null);

    useEffect(() => {
        if (editNote) {
            setNoteContent(editNote.noteContent);
        }
    }, [editNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (controller) {
            controller.abort();
        }

        const newController = new AbortController();
        setController(newController);
        try {
            if (editNote) {
                await updateNote({ ...editNote, noteContent }, newController.signal);
            } else if (noteContent.trim()) {
                await addNote(noteContent, newController.signal);
            } else {
                setErrorMessage('Note content cannot be empty');
            }
            setNoteContent('');
        } catch (err) {
            handleError(setErrorMessage, editNote ? 'Editing failed' : 'Saving failed', err);
        }
    };

    useEffect(() => {
        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, [controller]);

    return (
        <form onSubmit={handleSubmit} className='note-form'>
            <input
            type='text'
            value={noteContent}
            onChange={(e) => {
                setNoteContent(e.target.value);
                if (errorMessage) setErrorMessage(null);
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
        _id: PropTypes.string.isRequired,
        noteContent: PropTypes.string.isRequired
    }),
    updateNote: PropTypes.func.isRequired
};

export default NoteForm;

// The setNoteContent('') is called after both adding and updating a note. This is good, but you might want to ensure that it's only done after the action is successful.
// n handleSubmit, after the add/update operation, you may want to clear the controller state to avoid any stale references