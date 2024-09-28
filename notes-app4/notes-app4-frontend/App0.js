import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import ErrorNotification from './components/ErrorNotification';
import './App.css';
import './ErrorNotification.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const handleError = (userMessage, error) => {
        if (error.response) {
            const status = error.response.status;
            let detailedMessage = '';

            switch(status) {
                case 400:
                    detailedMessage = 'Bad Request. Please check your input.';
                    break;
                case 404:
                    detailedMessage = 'Resource not found.';
                    break;
                case 500:
                    detailedMessage = 'Internal Server Error. Please try again later.';
                    break;
                default:
                    detailedMessage='An unexpected error occurred. Please try again.'
            }

            console.error(`${userMessage}: ${detailedMessage}`, error.response.data);
            setErrorMessage(`${userMessage}: ${detailedMessage}`);
        } else if (error.request) {
            console.error(`${userMessage}: No response from the server.`, error.message);
            setErrorMessage(`${userMessage}: No response from the server. Please check your network.`);
        } else {
            console.error(`${userMessage}: ${error.message}`);
            setErrorMessage(`${userMessage}: ${error.message}`);
        }
    };

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
                handleError('Downloading failed', err);
            }
        }
    };

    const addNote = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        const source = axios.CancelToken.source();

        try  {
            const newNote = { content : content.trim() };
            const response = await axios.post('http://localhost:3001/notes', newNote,
                { cancelToken: source.token }
            );
            setNotes([...notes, response.data]);
            setContent('');
            setErrorMessage(null);
        } catch (err) {
            if (axios, isCancel(err)) {
                console.log('request canceled', err.message);
            } else {
                handleError('Saving failed', err);
            }
        }
    };

    const deleteNote = async (id) => {
        setDeletingId(id);
        const notesBackup = notes;
        setNotes(notes.filter(note => note._id !== id));
        const source = axios.CancelToken.source();

        try {
            await axios.delete(`http://localhost:3001/notes/${id}`, { cancelToken: source.token });
            setErrorMessage(null);
        } catch (err) {
            if (axios, isCancel(err)) {
                console.log('request canceled', err.message);
            } else {
                handleError('Deleting failed', err);
                setNotes(notesBackup);
            }
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className='app'>
            <h1>Notes</h1>
            {errorMessage && <div className = 'errorNotification'>
                <ErrorNotification message={errorMessage} />
                </div> }

            <form onSubmit={addNote}>
                <input
                type='text'
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                }}
                placeholder='Add a new note'
                />
                <button type='submit' disabled={!content.trim()}>Add</button>
            </form>

            {notes.length === 0 ? (
                <p>No notes to display</p>
            ) : (
            <div className='notes'>
                {notes.map(note => (                    
                    <Note key={note._id} note={note} deleteNote={deleteNote} deletingId={deletingId}/>
                ))}
            </div>
            )}
        </div>
    );
};

export default App;

// The URLs for your API calls are hardcoded to 'http://localhost:3001/notes'. For better flexibility and ease of deployment, it’s better to extract the base URL into a configuration file or use environment variables.
// The form input can also be cleared immediately on submission to make the UI feel more responsive.
// Editing notes functionality
// Components: You already have Note and ErrorNotification in separate components. As this app grows, splitting out more logic into smaller, more reusable components (like NoteList for rendering notes) might make sense to maintain clarity.