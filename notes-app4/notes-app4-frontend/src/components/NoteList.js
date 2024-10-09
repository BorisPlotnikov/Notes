import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, deleteNote, deleteId }) => {
    if (notes.length === 0) {
        return <p>No notes to display</p>
    }

    return (
        <div className='notes'>
            {notes.map(note => (
                <Note key={note._id} note={note} deleteNote={deleteNote} deleteId={deleteId}/>
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

// You might want to display a loading indicator or a placeholder when there are no notes instead of just text (e.g., an empty state UI).
// Consider handling edge cases such as error states or scenarios when the notes array is undefined or null (although this is rare if the API call works correctly).