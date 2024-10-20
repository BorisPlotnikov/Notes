import React, { useState, useEffect } from 'react';
import ErrorNotification from './components/ErrorNotification';
import PropTypes from 'prop-types';
import '../css/Note.css';

const Note =({ note, deleteNote, deleteId, setEditNote }) => {
    const [controller, setController] = useState(null);

    useEffect(() => {
        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, [controller]);

    const handleDelete = async (id) => {
        if (controller) {
            controller.abort();
        }

        const newController = new AbortController();
        setController(newController);

        try {
            await deleteNote(id);
        } catch (err) {
            handleError(setErrorMessage, 'Failed to delete note:', err);
        }
    };

    return (
        <div className='note'>
            <p>{note.content}</p>
            <button onClick={() => setEditNote(note)}>Edit</button>
            <button 
                onClick={() => handleDelete(note.id)}
                disabled={deleteId === note.id}>
                {deleteId === note.id ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    );
};

Note.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }),
    deleteNote: PropTypes.func.isRequired,
    deleteId: PropTypes.string,
    setEditNote: PropTypes.func.isRequired
};

export default Note;