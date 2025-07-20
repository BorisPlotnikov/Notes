// /src/providers/AppProviders.js

import { NotesProvider } from '../features/notes/context/NotesContext';

const AppProviders = ({ children }) => (
    <NotesProvider>
        {children}
    </NotesProvider>
);

export default AppProviders;