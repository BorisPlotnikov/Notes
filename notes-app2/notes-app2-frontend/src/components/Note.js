import React from 'react';

const Note = ({ note, deleteNote }) => (
    <div className="note">
        <p>{ note.content }</p>
        <button onClick={ () => deleteNote(note._id) }>Delete</button>
    </div>
);

export default Note;
