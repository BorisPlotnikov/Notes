import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import NoteForm  from './components/NoteForm';
import ErrorNotification from './components/ErrorNotification';
import '.css/App.css';
import '.css/ErrorNotification.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => { 
        const source = axios.CancelToken.source();
        fetchNotes(source, source.token);

        return () => {
            source.cancel('Component unmounted, request canceled');
        };
    }, []);

    useEffect(() => {
        if (errorMessage) {
            const timeout = setTimeout(() => setErrorMessage(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorMessage]);

    const fetchNotes = async (cancelToken = null) => {
        try {
            const response = await axios.get('http://localhost:3001/notes', { cancelToken });
            setNotes(response.data);
            setErrorMessage(null);
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message);
            } else {
                handleError(setErrorMessage, 'Downloading failed', err);
            }
        }
    };

    const addNote = async (content) => {
        const source = axios.CancelToken.source();
        try  {
            const newNote = { content : content.trim() };
            const response = await axios.post('http://localhost:3001/notes', newNote, {
                cancelToken: source.token
            });
            setNotes([...notes, response.data]);
            setErrorMessage(null);
        } catch (err) {
            if (axios, isCancel(err)) {
                console.log('request canceled', err.message);
            } else {
                handleError(setErrorMessage, 'Saving failed', err);
            }
        }
    };

    const deleteNote = async (id) => {
        const notesBackup = notes;
        setNotes(notes.filter(note => note._id !== id));
        try {
            await axios.delete(`http://localhost:3001/notes/${id}`);
            setErrorMessage(null);
        } catch (err) {
                handleError(setErrorMessage, 'Deleting failed', err);
                setNotes(notesBackup);
        }
    };

    return (
        <div className='app'>
            <h1>Notes</h1>
            {errorMessage && <ErrorNotification message={errorMessage} />}
            <NoteForm addNote={addNote} />
            <NoteList notes={notes} deleteNote={deleteNote} />
        </div>
    );
};

export default App;

// The URLs for your API calls are hardcoded to 'http://localhost:3001/notes'. For better flexibility and ease of deployment, it’s better to extract the base URL into a configuration file or use environment variables.
// The form input can also be cleared immediately on submission to make the UI feel more responsive.
// Editing notes functionality
// Components: You already have Note and ErrorNotification in separate components. As this app grows, splitting out more logic into smaller, more reusable components (like NoteList for rendering notes) might make sense to maintain clarity.