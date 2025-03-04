import React, { useState, useEffect } from 'react';
import '../css/NoteForm.css';
import PropTypes from 'prop-types';

const NoteForm = ({ addNote, errorMessage, setErrorMessage, noteToEdit, updateNote, processing, saving, adding }) => {
    const [content, setContent] = useState('');
    const [controller, setController] = useState(null);

    useEffect(() => {
        noteToEdit && setContent(noteToEdit.content);
    }, [noteToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newController = new AbortController();
        controller && controller.abort();
        setController(newController);
        
        try {
            if (noteToEdit) {
                await updateNote({ ...noteToEdit, content }, newController.signal);
                setContent('');
            } else if (content) {
                await addNote(content, newController.signal);
                setContent('');
            } else {
                handleError(setErrorMessage, 'Note content cannot be empty', new Error('Note content is empty'));
            }
        } catch (err) {
            handleError(setErrorMessage, `${noteToEdit ? 'Editing' : 'Saving'} failed`, err);
        } finally {
            setController(null);
        }
    };

    useEffect(() => {
        return () => controller && controller.abort();
        }, [controller]);

    const buttonLabel = saving
    ? 'Saving...' : adding ? 'Adding...'
    : noteToEdit ? 'Save' : 'Add'

    return (
        <form onSubmit={handleSubmit} className='note-form'>
            <input
            type='text'
            value={content}
            onChange={(e) => {
                setContent(e.target.value);
                errorMessage && setErrorMessage(null);
            }}
            placeholder='Add a new note'
            />
            <button type='submit' disabled={!content || processing}>{buttonLabel}</button>
        </form>
    );
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    setErrorMessage: PropTypes.func,
    noteToEdit: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }),
    updateNote: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    adding: PropTypes.bool.isRequired
};

export default NoteForm;