// components/Note.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CharacterCounter from './CharacterCounter';
import AccessibilityAlertRegion from './AccessibilityAlertRegion';
import { useNotes } from '../context/NotesContext';
import '../css/Note.css';

const Note = ({
    content,
    isEditing,
    onEdit,
    onCancel,
    onSave,
    textAreaRef,
}) => {
    const { loading, deleteNote } = useNotes();
    const [draft, setDraft] = useState(content);

    const trimmedContent = draft.trim();
    const contentLength = draft.length;
    const isContentValid = trimmedContent.length > 0;
    const isNearMaxLength = contentLength >= 180;

    useEffect(() => {
        if (isEditing) {
            setDraft(content);
        }
    }, [isEditing, content]);

    return (
        <div className="note" aria-busy={loading}>
            {isEditing ? (
                <div className="textarea-container">
                    <div className="input-wrapper">
                        <textarea
                            value={draft}
                            ref={textAreaRef}
                            onChange={(e) => setDraft(e.target.value)}
                            aria-label="Edit note content"
                        />
                        <CharacterCounter
                            contentLength={contentLength}
                            isNearMaxLength={isNearMaxLength}
                        />
                    </div>

                    <div className="button-container">
                        <button
                            className="save"
                            onClick={() => onSave(trimmedContent)}
                            disabled={loading || !isContentValid}
                            aria-label={loading ? 'Saving the note...' : 'Save note'}
                        >
                            Save
                        </button>
                        <button
                            className="cancel"
                            onClick={onCancel}
                            disabled={loading}
                            aria-label="Cancel the editing"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="display-state">
                    <p>{content}</p>
                    <div className="button-container">
                        <button
                            className="edit"
                            onClick={onEdit}
                            disabled={loading}
                            aria-label="Edit the note"
                        >
                            Edit
                        </button>
                        <button
                            className="delete"
                            onClick={deleteNote}
                            disabled={loading}
                            aria-label="Delete the note"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            <AccessibilityAlertRegion loading={loading} aria-live="assertive" />
        </div>
    );
};

Note.propTypes = {
    content: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    textAreaRef: PropTypes.func.isRequired,
};

export default Note;
