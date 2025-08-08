// /src/features/notes/NotesApp.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import AppLoader from '../../components/AppLoader';
import { useNotes } from './context/NotesContext';

const NotesApp = () => {
    const { isInitialized } = useNotes();

    return (
        <Container className="py-4">
            <Row className="mt-5 mb-4">
                <Col>
                    <div className="text-center border-bottom pb-2 mb-4">
                        <h1 className="fw-bold display-5">📝 Notes</h1>
                    </div>
                </Col>
            </Row>
            
            <Row className="mb-4">
                <Col>
                    <NoteForm />
                </Col>
            </Row>

            <Row>
                <Col>
                    {!isInitialized ? <AppLoader /> : <NoteList />}
                </Col>
            </Row>
        </Container>
    );
};

export default NotesApp;
