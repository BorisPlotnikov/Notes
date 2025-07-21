// /src/providers/AppProviders.js

import { NotesProvider } from '../features/notes/context/NotesProvider';
import PropTypes from 'prop-types';

const AppProviders = ({ children }) => (
    <NotesProvider>
        {children}
    </NotesProvider>
);

AppProviders.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppProviders;