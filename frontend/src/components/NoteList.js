// NoteList.js

import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, updateNote, deleteNote, loading, setNoteEditingState }) => {

    const displayNotes = () => {
        return notes.map(note => {
            return (
                <Note
                    key={note._id}
                    id={note._id}
                    noteContent={note.content}
                    updateNote={updateNote}
                    deleteNote={deleteNote}
                    loading={loading}
                    setNoteEditingState={setNoteEditingState}
                />
            );
    });
    };

    return (
        <div className='note-list' aria-live="polite"> 
            {
                notes.length > 0
                ? displayNotes()
                : <p>No notes available. Add a note to get started.</p>
            }
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    content: PropTypes.string.isRequired,
                    isEditing: PropTypes.bool.isRequired
                })
            ).isRequired,
    updateNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    setNoteEditingState: PropTypes.func.isRequired,
};

export default NoteList;

