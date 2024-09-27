import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import './App.css';
import ErrorNotification from './components/ErrorNotification';
import './ErrorNotification.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/notes');
            setNotes(response.data);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error fetching notes", error);
            setErrorMessage("Failed to load notes");
        }
    };

    const addNote = async (e) => {
        try {
            e.preventDefault();
            const newNote = {content};
            await axios.post('http://localhost:3001/notes', newNote);
            fetchNotes();
            setContent('');
            setErrorMessage(null);
        } catch (error) {
            console.error("Error adding note", error);
            setErrorMessage("Failed to add the note");
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/notes/${id}`);
            fetchNotes();
            setErrorMessage(null);
        } catch (error) {
            console.error("Error deleting note", error);
            setErrorMessage("Failed to delete the note");
        }
    };

    return (
        <div className='app'>
            <h1>notes</h1>
            <ErrorNotification message={errorMessage} />
            <form onSubmit={addNote}>
                <input
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Add a new note'
                />
                <button type='submit'>Add</button>
            </form>

            <div className='notes'>
                {notes.map(note => (
                    <Note key={note._id} note={note} deleteNote={deleteNote}/>
                ))}
            </div>
        </div>
    )
};

export default App;