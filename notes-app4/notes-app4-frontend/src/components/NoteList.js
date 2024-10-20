import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, deleteNote, deleteId }) => {
   notes.length === 0 && <p>No notes to display</p>

    return (
        <div className='notes'>
            {notes.map(note => (
                <Note key={note.id} noteContent={note.noteContent} deleteNote={deleteNote} deleteId={deleteId}/>
            ))}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        })
    ),
    deleteNote: PropTypes.func.isRequired,
    deleteId: PropTypes.string
    
};

export default NoteList;