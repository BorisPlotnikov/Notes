// components/NoteForm.js

import React from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { useNoteContent } from '../hooks';
import { useNotes } from '../context/NotesContext';
import { LENGTHS } from '../../../constants';
import CharacterCounter from './CharacterCounter';
import '../../../css';

const NoteForm = () => {
    const {
        addNote,
        loading,
        inputRef,
        handleError,
    } = useNotes();

    const {
        content,
        setContent,
        trimmedContent,
        contentLength,
        isValid,
        isNearMaxLength,
        onChange,
    } = useNoteContent('');

    const onSubmit = async (e) => {
        e.preventDefault();       
        try {
            await addNote(trimmedContent);
            setContent('');
        } catch (error) {
            handleError(error, 'Saving failed.');
        };
    };

    return (
        <Form onSubmit={onSubmit} className='my-3' aria-busy={loading}>
            <Form.Label htmlFor='note-content' visuallyHidden>
                Add a new note
            </Form.Label>

            <InputGroup>
                <Form.Control
                    id="note-content"
                    type="text"
                    value={content}
                    onChange={onChange}
                    ref={inputRef}
                    placeholder={loading ? "Please wait..." : "Add a new note"}
                    aria-label="Enter note content"
                    aria-describedby="character-counter"
                    maxLength={LENGTHS.MAX}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading || !isValid}
                    aria-label={loading ? "Adding note..." : "Add a new note"}
                >
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Adding...
                        </>
                    ) : (
                        'Add'
                    )}
                </Button>
            </InputGroup>

            <Form.Text id="character-counter" muted>
                <CharacterCounter
                    contentLength={contentLength}
                    isNearMaxLength={isNearMaxLength}
                />
            </Form.Text>
        </Form>
    );
};

export default NoteForm;
