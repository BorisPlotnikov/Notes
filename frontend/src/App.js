// /src/App.js

import React from 'react';                     
import './css/App.css';
import AppLoader from './components/AppLoader';
import NoteList from './features/notes/components/NoteList';
import NoteForm from './features/notes/components/NoteForm';
import { useNotes } from './features/notes/context/NotesContext';

const App = () => {
    const { isInitialized } = useNotes();

    return (
            <main className='app'>
                <h1>Notes</h1>
                <NoteForm />
                {!isInitialized ? <AppLoader /> : <NoteList />}
            </main>
    );
};

export default App;

