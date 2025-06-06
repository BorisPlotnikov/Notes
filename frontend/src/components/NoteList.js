// NoteList.js

import React from 'react';
import Note from './Note';
import '../css/NoteList.css';
import PropTypes from 'prop-types';

const NoteList = ({ notes, updateNote, deleteNote, loading, setNoteEditingState, inputRefs }) => {

    return (
        <div className='note-list' aria-live="polite"> 
            {
                notes.length > 0 ? (
                    notes.map(note => (
                        <Note
                            key={note._id}
                            id={note._id}
                            noteContent={note.content}
                            updateNote={updateNote}
                            deleteNote={deleteNote}
                            loading={loading}
                            setNoteEditingState={setNoteEditingState}
                            textAreaRef={el => {
                                if (el) inputRefs.current[note._id] = el;
                                else delete inputRefs.current[note._id];
                            }}
                        />            
                    ))
                ) : (
                    <p>No notes available. Add a note to get started.</p>
                )
            }
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    content: PropTypes.string.isRequired,
                    isEditing: PropTypes.bool.isRequired
                })
            ).isRequired,
    updateNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    setNoteEditingState: PropTypes.func.isRequired,
    inputRefs: PropTypes.shape({ 
        current: PropTypes.object }
    ).isRequired,
};

export default NoteList;

