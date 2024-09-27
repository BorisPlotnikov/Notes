import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import ErrorNotification from './components/ErrorNotification';
import './App.css';
import './ErrorNotification.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [editId, setEditId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleError = (message, error) => {
            console.error(message, error);
            setErrorMessage(message);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/notes');
            setNotes(response.data);
            setErrorMessage(null);
        } catch (err) {
            handleError('Downloading failed', err);
        }
    };

    const addNote = async (e) => {
        try  {
            e.preventDefault();
            const newNote = {content};
            const response = await axios.post('http://localhost:3001/notes', newNote);
            setNotes([...notes, response.data]);
            setContent('');
            setErrorMessage(null);
        } catch (err) {
            handleError('Saving failed', err);
        }
    };

    const editNote = async (id, updatedContent) => {
        const backupNotes = [...notes];
        try {
            setNotes(notes.map(note => note._id === id ? { ...note, content: updatedContent } : note));
            await axios.put(`http://localhost:3001/notes/${id}`, { content: updatedContent });
            setErrorMessage(null);
        } catch (err) {
            handleError('Editing failed', err);
            setNotes(backupNotes);
        }
    };

    const deleteNote = async (id) => {
        try {
            setNotes(notes.filter(note => note._id !== id));
            await axios.delete(`http://localhost:3001/notes/${id}`);
            setErrorMessage(null);
        } catch (err) {
            handleError('Deleting failed', err);
        }
    };

    return (
        <div className='app'>
            <h1>Notes</h1>
            {errorMessage && <ErrorNotification message={errorMessage} />}

            <form onSubmit={addNote}>
                <input
                type='text'
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    setErrorMessage(null);
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
                    <div key={note._id}>
                        {editId === note._id ? (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                editNote(note._id, editContent);
                                setEditId(null);
                            }}>
                                <input
                                type='text'
                                value={updatedContent}
                                onChange={(e) => setUpdatedContent(e.target.value)}
                                placeholder='Edit note content'
                                />
                            </form>
                        )}}










                    <Note key={note._id} note={note} editNote={editNote} deleteNote={deleteNote} />
                ))}
            </div>
            )}
        </div>
    );
};

export default App;
