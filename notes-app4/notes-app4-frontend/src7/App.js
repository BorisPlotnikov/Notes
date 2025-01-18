// App.js

import React, { useState } from 'react';
import useUpdateNote from '../hooks/useUpdateNote';
import useDeleteNote from '../hooks/useDeleteNote';
import NoteList from './componenets/NoteList';
import ErrorNotification from './components/ErrorNotification';
import Spinner from './components/Spinner';
import './css/App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const { updateNote } = useUpdateNote(setNotes, setErrorMessage, setLoading);
    const { deleteNote } = useDeleteNote(setNotes, setErrorMessage, setLoading);

        return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteList
                notes={notes}
                updateNote={updateNote}
                deleteNote={deleteNote}
                loading={loading}
            />
            {loading && <Spinner />}
            {errorMessage && <ErrorNotification message={errorMessage} />}  
        </div>
    );
};


export default App;