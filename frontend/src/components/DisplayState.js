// DisplayState.js

import React from 'react';
import { STATES } from '../constants/constants';
import PropTypes from 'prop-types';

const DisplayState = ({
    content,
    id,
    state,
    deleteNote,
    setState,
    loading
}) => {

    return (
        <>
            <p>{content}</p>
            
            <button
                onClick={() => deleteNote(id)}
                disabled={loading}
                aria-label="delete the note"
            >
                Delete
            </button>
            
            <button
                onClick={() => setState(STATES.EDITING)}
                disabled={state === STATES.EDITING || loading}
                aria-label="Edit the note"
            >
                Edit
            </button>
        </>
    );
};

DisplayState.propTypes = {
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired, // Check this ID
    state: PropTypes.oneOf([STATES.EDITING, STATES.DISPLAY]).isRequired,
    deleteNote: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default DisplayState;
