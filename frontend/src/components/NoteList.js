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
        editingNoteIds,
        setEditingNoteIds,
        noteInputRefs,
    } = useNotes();

    const handleEdit = (id) => {
        setEditingNoteIds(prev =>(prev.includes(id) ? prev: [...prev, id]));
    };

    const handleCancel = (noteId) => {
        setEditingNoteIds(prev => prev.filter(id => id !== noteId));
    };

    const handleSave = (id, newContent) => {
        updateNote(id, newContent);
        handleCancel(id);
    };

    return (
        <div className="note-list" aria-live="polite">
            {notes.length > 0 ? (
                notes.map(note => (
                    <Note
                        key={note._id}
                        id={note._id}
                        content={note.content}
                        isEditing={editingNoteIds.includes(note._id)}
                        onEdit={() => handleEdit(note._id)}
                        onCancel={() => handleCancel(note._id)}
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
