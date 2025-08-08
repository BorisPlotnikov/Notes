// /src/features/notes/components/Note.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button } from 'react-bootstrap';
import '../../../css';

import CharacterCounter from '../components/CharacterCounter';
import AccessibilityAlertRegion from '../components/AccessibilityAlertRegion';

import validateNoteContent from '../../../utils/validateNoteContent';
import { useNotes } from '../context/NotesContext';

const Note = ({
    id,
    content,
    isEditing,
    onEdit,
    onCancel,
    onSave,
    textAreaRef,
}) => {
    const { loading, deleteNote } = useNotes();
    const [draft, setDraft] = useState(content);

    const {
        trimmedContent,
        contentLength,
        isValid,
        isNearMaxLength,
    } = validateNoteContent(draft, content);


    useEffect(() => {
        if (isEditing) {
            setDraft(content);
        }
    }, [isEditing, content]);

    return (
        <Card className="mb-3" aria-busy={loading}>
            <Card.Body>
                {isEditing ? (
                    <>
                        <Form.Group controlId={`note-${id}`} className="mb-3">
                            <Form.Label visuallyHidden>Edit note content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                ref={textAreaRef}
                                aria-label="Edit note content"
                                disabled={loading}
                            />
                            <Form.Text id={`counter-${id}`} muted>
                                <CharacterCounter
                                    contentLength={contentLength}
                                    isNearMaxLength={isNearMaxLength}
                                />
                            </Form.Text>
                        </Form.Group>

                        <div className="d-flex gap-2 note-button-group mt-4">
                            <Button
                                className="note-button"
                                variant="success"
                                onClick={() => onSave(trimmedContent)}
                                disabled={loading || !isValid}
                                aria-label={loading ? 'Saving the note...' : 'Save note'}
                                size="sm"
                            >
                                Save
                            </Button>
                            <Button
                                className="note-button"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={loading}
                                aria-label="Cancel the editing"
                                size="sm"
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <Card.Text>{content}</Card.Text>
                        <div className="d-flex gap-2 note-button-group mt-4">
                            <Button
                                className="note-button"
                                variant="outline-primary"
                                onClick={onEdit}
                                disabled={loading}
                                aria-label="Edit the note"
                                size="sm"
                            >
                                Edit
                            </Button>
                            <Button
                                className="note-button"
                                variant="outline-danger"
                                onClick={() => deleteNote(id)}
                                disabled={loading}
                                aria-label="Delete the note"
                                size="sm"
                            >
                                Delete
                            </Button>
                        </div>
                    </>
                )}
            </Card.Body>
            <AccessibilityAlertRegion loading={loading} aria-live="assertive" />
        </Card>
    );
};

Note.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    textAreaRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }).isRequired,
};

export default Note;
