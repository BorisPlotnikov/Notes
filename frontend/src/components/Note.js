// components/Note.js

import React, { useState, useEffect } from 'react';
import EditingState from './EditingState';
import DisplayState from './DisplayState';
import AccessibilityAlertRegion from './AccessibilityAlertRegion';
import useNoteContent from '../hooks/useNoteContent';
import { STATES } from '../constants/constants';
import PropTypes from 'prop-types';
import '../css/Note.css';

const Note = ({ 
    id, 
    noteContent, 
    updateNote, 
    deleteNote, 
    loading, 
    setNoteEditingState, 
    inputRefs 
}) => {

    const {
        content,
        setContent,
        trimmedContent,
        contentLength,
        isContentValid,
        isNearMaxLength,
        onChange,
    } = useNoteContent(noteContent);

    const [noteState, setNoteState] = useState(STATES.NOTE.DISPLAY);

    const onSave = () => {
        updateNote(id, trimmedContent);
        setNoteEditingState(id, false);
        setNoteState(STATES.NOTE.DISPLAY);
    };

    const onCancel = () => {
        setContent(noteContent);
        setNoteEditingState(id, false);
        setNoteState(STATES.NOTE.DISPLAY);
    }

    useEffect(() => {
        const el = inputRefs.current[id];
        if (noteState === STATES.NOTE.EDITING && el) {
            el.focus();
            el.selectionStart = el.sectionEnd = el.value.length;
        }
    }, [noteState, inputRefs, id]);

    const textAreaRef = el => {
        if (el) inputRefs.current[id] = el;
        else delete inputRefs.current[id];
    };

    return (
        <div className='note' aria-busy={loading}>
            <div aria-live="polite">
                {
                    noteState === STATES.NOTE.EDITING
                    ? <EditingState
                        contentLength={contentLength}
                        isContentValid={isContentValid}
                        isNearMaxLength={isNearMaxLength}
                        content={content}
                        onChange={onChange}
                        onSave={onSave}
                        onCancel={onCancel}
                        loading={loading}
                        textAreaRef={textAreaRef}
                      />
                    : <DisplayState
                        content={content}
                        id={id}
                        noteState={noteState}
                        deleteNote={deleteNote}
                        setNoteState={setNoteState}
                        setNoteEditingState={setNoteEditingState}
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
    loading: PropTypes.bool.isRequired,
    setNoteEditingState: PropTypes.func.isRequired,
    inputRefs: PropTypes.shape({
        current: PropTypes.object.isRequired
    }).isRequired
};

export default Note;
