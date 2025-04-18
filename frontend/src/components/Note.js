// Note.js

import React, { useState } from 'react';
import EditingState from './EditingState';
import DisplayState from './DisplayState';
import AccessibilityAlertRegion from './AccessibilityAlertRegion';
import useNoteValidation from '../hooks/useNoteValidation';
import { STATES } from '../constants/constants';
import PropTypes from 'prop-types';
import '../css/Note.css';

const Note = ({ id, noteContent, updateNote, deleteNote, loading }) => {
    const { content, trimmedContent, handleChange } = useNoteValidation(noteContent);
    const [state, setState] = useState(STATES.DISPLAY);

    const handleSave = () => {
        updateNote(id, trimmedContent);
        setState(STATES.DISPLAY);
    };

    const handleCancel = () => {
        setState(STATES.DISPLAY);
    }

    return (
        <div className='note' aria-busy={loading}>
            <div aria-live="polite">
                {
                    state === STATES.EDITING
                    ? <EditingState
                        content={content}
                        handleChange={handleChange}
                        trimmedContent={trimmedContent}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                        setState={setState}
                        loading={loading}
                      />
                    : <DisplayState
                        content={content}
                        id={id}
                        state={state}
                        deleteNote={deleteNote}
                        setState={setState}
                        loading={loading}
                      />
                }
            </div>

            <AccessibilityAlertRegion loading={loading} aria-live="assertive" />
        </div>
    );
};

Note.propTypes = {
    id: PropTypes.string.isRequired,
    noteContent: PropTypes.string.isRequired,
    updateNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Note;
