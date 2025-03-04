import React, { useState, useEffect } from 'react';
import './css/App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const editNote = async (id) => {};
    const deleteNote = async (id) => {};
        return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteList
                notes={notes}
                deleteNote={deleteNote}
                editNote={editNote}
            />         
        </div>
    );
};
export default App;