// components/NoteList

import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { EMPTY_STATE_MESSAGES } from '../../../constants';

import { useNotes } from '../context/NotesContext';
import Note from './Note';
import '../../../css';

const NoteList = () => {
    const {
        notes,
        updateNote,
        editingIds,
        setEditingIds,
        noteInputRefs,
    } = useNotes();

    const enterEditMode = (id) => {
        setEditingIds(prev => (
            prev.includes(id) ? prev: [...prev, id]
        ));
    };

    const exitEditMode = (noteId) => {
        setEditingIds(prev => prev.filter(id => id !== noteId));
        delete noteInputRefs.current[noteId];
    };

    const handleSave = (id, newContent) => {
        updateNote(id, newContent);
        exitEditMode(id);
    };

    return (
        <Container className="mt-4" aria-live="polite">
            {notes.length > 0 ? (
                <Row className="g-3">
                    {notes.map(note => (
                        <Col key={note._id} xs={12} md={6} lg={4}>
                            <ErrorBoundary>
                                <Note
                                    id={note._id}
                                    content={note.content}
                                    isEditing={editingIds.includes(note._id)}
                                    onEdit={() => enterEditMode(note._id)}
                                    onCancel={() => exitEditMode(note._id)}
                                    onSave={(newContent) => handleSave(note._id, newContent)}
                                    textAreaRef={(el) => {
                                        if (el) noteInputRefs.current[note._id] = el;
                                        else delete noteInputRefs.current[note._id];
                                    }}
                                />
                            </ErrorBoundary>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="info">{EMPTY_STATE_MESSAGES.NO_NOTES}</Alert>
            )}
        </Container>
    );
};

export default NoteList;
