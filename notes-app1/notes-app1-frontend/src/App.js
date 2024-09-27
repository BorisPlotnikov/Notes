import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);


const fetchNotes = async () => {
  const response = await axios.get('http://localhost:3001/notes');
  setNotes(response.data);
};

const addNote = async (e) => {
  e.preventDefault();
  const newNote = { content };
  await axios.post('http://localhost:3001/notes', newNote);
  fetchNotes();
  setContent('');
};

const deleteNote = async (id) => {
  await axios.delete(`http://localhost:3001/notes/${id}`);
  fetchNotes();
};

return (
    <div className="App">
      <h1>Notes</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a new note"
        />
        <button type="submit">Add</button>
      </form>
      <div className="notes">
        {notes.map(note => (
          <Note key={note._id} note={note} deleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
};

export default App;
