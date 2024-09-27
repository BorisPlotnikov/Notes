import React from 'react';
import PropTypes from 'prop-types';

const Note =({ note, editNote, deleteNote }) => (
    <div className='note'>
        <p>{note.content}</p>
        <button onClick={() => editNote(note._id)}>Edit</button>
        <button onClick={() => deleteNote(note._id)}>Delete</button>
    </div>
);

Note.propTypes = {
    note: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }).isRequired,
    editNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired
};

export default Note;