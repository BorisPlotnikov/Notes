import React from 'react';
import Note from './Note';
import './NoteList.css';

const NoteList = ({ notes, deleteNote }) => {
    if (notes.length === 0) {
        return <p>No notes to display</p>
    }

    return (
        <div className='notes'>
            {notes.map(note => (
                <Note key={note._id} note={note} deleteNote={deleteNote} />
            ))}
        </div>
    );
};

export default NoteList;