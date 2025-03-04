import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, deleteNote, modId }) => {
   notes.length === 0 && <p>No notes to display</p>

    return (
        <div className='notes'>
            {notes.map(note => (
                <Note
                    key={note.id}
                    id={note.id}
                    content={note.content}
                    deleteNote={deleteNote}
                    modId={modId}
                />
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
    modId: PropTypes.string,
    setErrorMessage: PropTypes.func.isRequired
};

export default NoteList;