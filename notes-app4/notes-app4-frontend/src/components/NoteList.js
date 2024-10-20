import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import { v4 as uuid4 } from 'uuid';
import PropTypes from 'prop-types';

const NoteList = ({ notes, deleteNote, deleteId }) => {
    if (notes.length === 0) {
        return <p>No notes to display</p>
    }

    return (
        <div className='notes'>
            {notes.map(note => (
                <Note key={uuidv4()} note={note} deleteNote={deleteNote} deleteId={deleteId}/>
            ))}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        })
    ),
    deleteNote: PropTypes.func.isRequired,
    deleteId: PropTypes.string
    
};

export default NoteList;