// DisplayState.js

import React from 'react';
import useNoteValidation from '../hooks/useNoteValidation';
import PropTypes from 'prop-types';

const DisplayState = ({
    setEditing,
    editing,
    noteContent,
    loading
}) => {
    
    const { content } = useNoteValidation(noteContent);

    return (
        <>
            <p>{content}</p>
            <button
                onClick={() => setEditing(true)}
                disabled={editing || loading}
                aria-label="Edit the note"
            >
                Edit
            </button>
        </>
        
    );
};

DisplayState.propTypes = {
    setEditing: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    noteContent: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
};

export default DisplayState;