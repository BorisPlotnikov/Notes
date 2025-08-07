// components/NoteList

import React from 'react';
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
        <div className="note-list" aria-live="polite">
            {notes.length > 0 ? (
                notes.map(note => (
                    <ErrorBoundary key={note._id}>
                        <Note
                            key={note._id}
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
                ))
            ) : (
                <p>{ EMPTY_STATE_MESSAGES.NO_NOTES }</p>
            )}
        </div>
    );
};

export default NoteList;
