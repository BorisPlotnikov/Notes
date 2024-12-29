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

    const updateNote = async (id, newContent) => {
        setLoading(true);
        try {
             await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/notes/${id}`,
                { content: newContent },
                { signal: controller.signal }
            );

            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id ? {...note, content: newContent } : note
                )
            );
        } catch (err) {
                handleError(
                    setMessage,
                    axios.isCancel(err) ? 'Request canceled' : 'Updating failed',
                    err
                );
        } finally {
            setLoading(false);
        }
    };

        return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteList
                notes={notes}
                updateNote={updateNote}
            />
            {loading && <Spinner />}
            {message && <ErrorNotification message={message} />}  
        </div>
    );
};
export default App;