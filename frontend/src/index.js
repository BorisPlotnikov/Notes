// /src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppProviders from './providers/AppProviders';
import ErrorBoundary from './components/ErrorBoundary';
import './css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <AppProviders>
                <App />
            </AppProviders>
        </ErrorBoundary>
    </React.StrictMode>
);

