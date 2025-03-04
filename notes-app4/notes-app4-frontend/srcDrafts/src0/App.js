import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import NoteList from './components/NoteList';
import NoteForm  from './components/NoteForm';
import handleError from '../utils/errorHandler';
import ErrorNotification from './components/ErrorNotification';
import './css/App.css';

dotenv.config();
// _____________________________________________________________________________________________________________________________________________
const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [modId, setModId] = useState(null);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
// _____________________________________________________________________________________________________________________________________________
    useEffect(() => {
            const timer = setTimeout(() => setProcessing(true), 300);
            return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (errorMessage) {
            const timeout = setTimeout(() => setErrorMessage(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorMessage]);
// ______________________________________________________________________________________________________________________________________________
    useEffect(() => {
        const controller = new AbortController();

        const fetchNotes = async () => {
            setProcessing(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notes`, { signal: controller.signal });
                if (Array.isArray(response.data)) {
                    setNotes(response.data);
                } else {
                    handleError(setErrorMessage, 'Unexpected data format');
                }              
            } catch (err) {
                handleError(
                    setErrorMessage,
                    axios.isCancel(err) ? 'Request is canceled' : 'Downloading failed',
                    err
                );
            } finally {
                setProcessing(false);
            }
        };

        fetchNotes();

        return () => {
            controller.abort();
        };
    }, []);
// _______________________________________________________________________________________________________________________________________________
    const addNote = async (content, signal) => {
        setProcessing(true);
        setAdding(true);
        try  {
            const indexedNote = { id : uuidv4(), content : content };
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/notes`, indexedNote, { signal });
            setNotes((prevNotes) => [...prevNotes, response.data]);
        } catch (err) {
            handleError(
                setErrorMessage,
                axios.isCancel(err) ? 'Request is canceled' : 'Saving failed',
                err
            );
        } finally {
            setProcessing(false);
            setAdding(false);
        }
    };
// ______________________________________________________________________________________________________________________________________________
    const deleteNote = async (id) => {
        setProcessing(true);
        setDeleteId(id);
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        const notesBackup = [...notes];
        const controller = new AbortController();
        
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/notes/${id}`, { signal: controller.signal });
        } catch (err) {
            if (axios.isCancel(err)) {
                handleError(setErrorMessage, 'Request canceled', err);
            } else {
                handleError(setErrorMessage, 'Deleting failed', err);
                setNotes(notesBackup);
            }
        } finally {
            setProcessing(false);
        }

        return controller;
    };
// _______________________________________________________________________________________________________________________________________________
    const updateNote = async (noteToEdit, signal) => {
        setProcessing(true);
        setSaving(true);
        const controller = new AbortController();
        try {
            const response = await axios.put (`${process.env.REACT_APP_API_BASE_URL}/notes/${noteToEdit.id}`, noteToEdit, { signal });
            setNotes((prevNotes) => prevNotes.map(note => (note.id === noteToEdit.id ? response.data : note)));
            setNoteToEdit(null);
        } catch (err) {
            handleError(
                setErrorMessage,
                axios.isCancel(err) ? 'Request is canceled' : 'Updating failed',
                err
            );
        } finally {
            setProcessing(false);
            setSaving(false);
        }

        return controller;
    };
// ________________________________________________________________________________________________________________________________________________
    return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteForm
                addNote={addNote}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                noteToEdit={noteToEdit}
                updateNote={updateNote}
                processing={processing}
                saving={saving}
                adding={adding}
            />
            {processing ? (
                <div className="spinner">Loading...</div> // Display loading indicator
            ) : notes.length > 0 ? (
                <NoteList
                    notes={notes}
                    deleteNote={deleteNote}
                    modId={modId}
                    setNoteToEdit={setNoteToEdit}
                />
            ) : (
                <div>No notes available</div>
            )}
            {errorMessage && <ErrorNotification message={errorMessage} />}
        </div>
    );
};

export default App;