// Import React and ReactDOM libraries to work with React and render the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component from the 'App' file
import App from './App';

// Import the CSS stylesheet for styling the app (located in the 'index.css' file)
import '.css/index.css';

// Create a reference to the root element in the HTML where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root element. The React.StrictMode helps identify potential problems in the app during development.
root.render(
    <React.StrictMode>
        {/* Render the main App component */}
        <App />
    </React.StrictMode>
);
