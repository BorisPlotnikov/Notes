import React from 'react';
import PropTypes from 'prop-types';

const Note =({ note, deleteNote, deletingId }) => (
    <div className='note'>
        <p>{note.content}</p>
        <button onClick={() => deleteNote(note._id)} disabled={deletingId === note._id}>
            {deletingId === note._id ? 'Deleting...' : 'Delete'}
        </button>
    </div>
);

Note.propTypes = {
    note: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }).isRequired,
    deleteNote: PropTypes.func.isRequired,
    deletingId: PropTypes.string
};

export default Note;