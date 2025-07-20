// /src/App.js

import React from 'react';                     
import './css/App.css';
import AppLoader from './components/AppLoader';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { useNotes } from './features/notes/context/NotesContext';

const App = () => {
    const { loading, isInitialized } = useNotes();

    if (!isInitialized) {
        return <AppLoader message="Loading your notes..." />
    }

    return (
            <main className='app'>
                <h1>Notes</h1>
                <NoteForm />
                {loading ? <Spinner /> : <NoteList />}
            </main>
    );
};

export default App;

