import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/Note.css';

const Note =({ note, deleteNote, deleteId }) => (
    <div className='note'>
        <p>{note.content}</p>
        <button 
            onClick={() => deleteNote(note._id)}
            disabled={deleteId === note._id}>
            {deleteId === note._id ? 'Deleting...' : 'Delete'}
        </button>
    </div>
);

Note.propTypes = {
    note: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }).isRequired,
    deleteNote: PropTypes.func.isRequired,
    deleteId: PropTypes.string
};

export default Note;