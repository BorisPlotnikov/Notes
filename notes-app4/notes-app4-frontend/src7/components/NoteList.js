// NoteList.js

import React from 'react'; // Import React
import Note from './Note'; // Import the Note component for rendering individual notes
import '../css/NoteList.css'; // Import CSS for styling the NoteList
import PropTypes from 'prop-types'; // Import PropTypes for type-checking props

// NoteList component to display a list of notes
const NoteList = ({ notes, updateNote, deleteNote, loading }) => {

    // Function to map through notes and render individual Note components
    const displayNotes = () => {
        return notes.map(note => (
            <Note
                key={note.id} // Unique key for each note
                id={note.id} // Pass note id to the Note component
                noteContent={note.content} // Pass note content to the Note component
                updateNote={updateNote} // Pass the updateNote function to Note component
                deleteNote={deleteNote} // Pass the deleteNote function to Note component
                loading={loading} // Pass loading state to the Note component
            />
        ));
    };

    return (
        <div className='note-list' aria-live="polite"> 
            {/* Accessibility feature: 'aria-live' informs screen readers about dynamic updates to the list */}
            
            {/* Conditionally render notes or a message when no notes are available */}
            {
                notes.length > 0
                ? displayNotes() // Render notes if the array is not empty
                : <p>No notes available. Add a note to get started.</p> // Message when no notes are present
            }
        </div>
    );
};

// Prop types validation to ensure correct data types are passed to the component
NoteList.propTypes = {
    notes: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired, // Each note should have a unique 'id'
                    content: PropTypes.string.isRequired // Each note should have content
                })
            ).isRequired,
    updateNote: PropTypes.func.isRequired, // 'updateNote' should be a function
    deleteNote: PropTypes.func.isRequired, // 'deleteNote' should be a function
    loading: PropTypes.bool.isRequired // 'loading' should be a boolean
};

export default NoteList; // Export the NoteList component
