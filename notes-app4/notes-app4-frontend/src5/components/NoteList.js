// NoteList.js

import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, updateNote, loading }) => {
    return (
        <div className='note-list'>
            {notes.map(note => (
                <Note
                    key={note.id}
                    id={note.id}
                    noteContent={note.content}
                    updateNote={updateNote}
                    loading={loading}
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
    updateNote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};
export default NoteList;