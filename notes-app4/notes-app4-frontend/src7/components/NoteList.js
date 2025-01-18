// NoteList.js

import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, updateNote, deleteNote, loading }) => {

    const displayNotes = () => {
        return notes.map(note => (
            <Note
                key={note.id}
                id={note.id}
                noteContent={note.content}
                updateNote={updateNote}
                deleteNote={deleteNote}
                loading={loading}
            />
        ))
        
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
                    id: PropTypes.string.isRequired,
                    content:PropTypes.string.isRequired
                })
            ).isRequired,
    updateNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};
export default NoteList;