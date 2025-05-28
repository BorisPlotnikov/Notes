// DisplayState.js

import React from 'react';
import { STATES } from '../constants/constants';
import '../css/DisplayState.css';
import PropTypes from 'prop-types';

const DisplayState = ({
    content,
    id,
    noteState,
    deleteNote,
    setNoteState,
    loading
}) => {

    return (
        <>
            <p>{content}</p>

            <div className="button-container">         
                <button
                    className="delete"
                    onClick={() => deleteNote(id)}
                    disabled={loading}
                    aria-label="delete the note"
                >
                    Delete
                </button>
                
                <button
                    className="edit"
                    onClick={() => setNoteState(STATES.NOTE.EDITING)}
                    disabled={noteState === STATES.NOTE.EDITING || loading}
                    aria-label="Edit the note"
                >
                    Edit
                </button>
            </div>
        </>
    );
};

DisplayState.propTypes = {
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    noteState: PropTypes.oneOf([STATES.NOTE.EDITING, STATES.NOTE.DISPLAY]).isRequired,
    deleteNote: PropTypes.func.isRequired,
    setNoteState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default DisplayState;
