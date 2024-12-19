import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, deleteNote, editNote }) => {
    return (
        <div className='notes'>
            {notes.map(note => (
                <Note
                    key={note.id}
                    id={note.id}
                    content={note.content}
                    deleteNote={deleteNote}
                    editNote={editNote}
                />
            ))}
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
    deleteNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired
};
export default NoteList;