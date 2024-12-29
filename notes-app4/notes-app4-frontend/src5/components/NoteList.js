import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, updateNote }) => {
    return (
        <div className='note-list'>
            {notes.map(note => (
                <Note
                    key={note.id}
                    id={note.id}
                    content={note.content}
                    updateNote={updateNote}
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
            ).isRequired
};
export default NoteList;