import React from 'react';
import PropTypes from 'prop-types';
import '../css/Note.css';

const Note = ({ id, content, deleteNote}) => {

    return (
        <div className='note'>
            <p>{content}</p>
            <button onClick={() => deleteNote(id)}>Delete</button>
        </div>
    );
};

Note.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    deleteNote: PropTypes.func.isRequired
};

export default Note;