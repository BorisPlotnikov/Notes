// /src/App.js

import React from 'react';
import NotesApp from './features/notes/NotesApp';                     
import './css/App.css';

const App = () => {

    return (
            <main className="app text-center">
                <NotesApp />
            </main>
    );
};

export default App;

