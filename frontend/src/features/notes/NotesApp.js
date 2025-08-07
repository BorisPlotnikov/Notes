// /src/features/notes/NotesApp.js

import React from 'react';
import { Container } from 'react-bootstrap';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import AppLoader from '../../components/AppLoader';
import { useNotes } from './context/NotesContext';

const NotesApp = () => {
    const { isInitialized } = useNotes();

    return (
        <>
            <h1>Notes</h1>
            <Container className="mt-4">
                <NoteForm />
                {!isInitialized ? <AppLoader /> : <NoteList />}
            </Container>
        </>
    );
};

export default NotesApp;
