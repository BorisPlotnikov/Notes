import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import ErrorNotification from './components/ErrorNotification';
import './App.css';
import './ErrorNotification.css';

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/notes');
            setNotes(response.data);
            setErrorMessage(null);
        } catch (err) {
            console.error('Error occurred while downloading notes', err);
            setErrorMessage('Failed downloading notes');
        }
    };

    const addNote = async (e) => {
        try {
            e.preventDefault();
            if (!content.trim()) {
                setErrorMessage('A note cannot be empty');
                return;
            }
            const newNote = {content};
            await axios.post('http://localhost:3001/notes', newNote);
            fetchNotes();
            setContent('');
            setErrorMessage(null);
        } catch (err) {
            console.error('Error occurred while attempting to add the note', err);
            setErrorMessage('Failed to add the note');
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/notes/${id}`);
            fetchNotes();
        } catch (err) {
            console.error('Error occurred while attempting to delete the note', err);
            setErrorMessage('Failed to delete the note');
        }
    };

    return (
        <div className='app'>
            <h1>Notes</h1>
            {errorMessage && <ErrorNotification message={errorMessage} />}
            <form onSubmit = {addNote}>
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
                    <Note key={note._id} note={note} deleteNote={deleteNote} />
                ))}
            </div>
        </div>
    );
};

export default App;

