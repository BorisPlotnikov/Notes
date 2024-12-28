import React, { useState, useEffect } from 'react';
import ErrorNotification from './components/ErrorNotification';
import Spinner from './components/Spinner';
import dotenv from 'dotenv';
import axios from 'axios';
import handleError from '../utils/errorHandler';
import './css/App.css';
dotenv.config();

const App = () => {
    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const controller = new AbortController();
    useEffect(() => { return () => controller.abort() }, []);

    const deleteNote = async (id) => {
        setLoading(true);
        const backup = [...notes];
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        try {
             await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}/notes/${id}`,
                { signal : controller.signal }
            );
        } catch (err) {
                handleError(
                    setMessage,
                    axios.isCancel(err) ? 'Request canceled' : 'Deleting failed',
                    err
                );
                setNotes(backup);
        } finally {
            setLoading(false);
        }
    };

        return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteList
                notes={notes}
                deleteNote={deleteNote}
            />
            {loading && <Spinner />}
            {message && <ErrorNotification message={message} />}  
        </div>
    );
};
export default App;