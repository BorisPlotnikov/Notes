// components/NoteList

import React from 'react';
import Note from './Note';
import { useNotes } from '../context/NotesContext';
import '../css/NoteList.css';

const NoteList = () => {
    const {
        notes,
        updateNote,
        deleteNote,
        loading,
        editingIds,
        setEditingIds,
        noteInputRefs,
    } = useNotes();

    const enterEditMode = (id) => {
        setEditingIds(prev =>(prev.includes(id) ? prev: [...prev, id]));
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
                    <Note
                        key={note._id}
                        id={note._id}
                        content={note.content}
                        isEditing={editingIds.includes(note._id)}
                        onEdit={() => enterEditMode(note._id)}
                        onCancel={() => exitEditMode(note._id)}
                        onSave={(newContent) => handleSave(note._id, newContent)}
                        deleteNote={() => deleteNote(note._id)}
                        loading={loading}
                        textAreaRef={(el) => {
                            if (el) noteInputRefs.current[note._id] = el;
                            else delete noteInputRefs.current[note._id];
                        }}
                    />
                ))
            ) : (
                <p>No notes available. Add a note to get started.</p>
            )}
        </div>
    );
};

export default NoteList;
