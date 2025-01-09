// useUpdateNote.js
import { useState } from 'react';
import axios from 'axios';
import handleError from '../utils/errorHandler';

const useUpdateNote = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const updateNote = async (id, newContent, controller) => {
        setLoading(true);
        try {
            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/notes/${id}`,
                { content: newContent },
                { signal: controller.signal }
            );
            return newContent;
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

    return { updateNote, loading, message };
};

export default useUpdateNote;





// App.js
import React, { useState, useEffect } from 'react';
import ErrorNotification from './components/ErrorNotification';
import Spinner from './components/Spinner';
import dotenv from 'dotenv';
import useUpdateNote from './hooks/useUpdateNote'; // Import the custom hook
import './css/App.css';

dotenv.config();

const App = () => {
    const [notes, setNotes] = useState([]);
    const { updateNote, loading, message } = useUpdateNote(); // Destructure the hook

    const controller = new AbortController();
    useEffect(() => {
        return () => controller.abort();
    }, []);

    const handleUpdateNote = async (id, newContent) => {
        const updatedContent = await updateNote(id, newContent, controller);
        if (updatedContent) {
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id ? { ...note, content: updatedContent } : note
                )
            );
        }
    };

    return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteList
                notes={notes}
                updateNote={handleUpdateNote} // Use the handler
                loading={loading}
            />
            {loading && <Spinner />}
            {message && <ErrorNotification message={message} />}  
        </div>
    );
};

export default App;
