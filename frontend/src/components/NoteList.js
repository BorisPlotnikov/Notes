import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import '../css/NoteList.css';

const NoteList = ({ notes, updateNote, deleteNote, loading, editingNoteIds, setEditingNoteIds }) => {
    const inputRefs = useRef({});

    const handleEdit = (id) => {
        setEditingNoteIds(prev => new Set(prev).add(id));
    };

    const handleCancel = (id) => {
        setEditingNoteIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
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
                        isEditing={editingNoteIds.has(note._id)}
                        onEdit={() => handleEdit(note._id)}
                        onCancel={() => handleCancel(note._id)}
                        onSave={(newContent) => handleSave(note._id, newContent)}
                        deleteNote={() => deleteNote(note._id)}
                        loading={loading}
                        textAreaRef={(el) => {
                            if (el) inputRefs.current[note._id] = el;
                            else delete inputRefs.current[note._id];
                        }}
                    />
                ))
            ) : (
                <p>No notes available. Add a note to get started.</p>
            )}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
    updateNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    editingNoteIds: PropTypes.instanceOf(Set).isRequired,
    setEditingNoteIds: PropTypes.func.isRequired,
};

export default NoteList;
