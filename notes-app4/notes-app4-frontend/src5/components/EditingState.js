// EditingState.js

import React from 'react';
import CharacterCounter from './CharacterCounter';
import '../css/EditingState.css';
import PropTypes from 'prop-types';

const EditingState = ({
                        content,
                        handleChange,
                        trimmedContent,
                        handleSave,
                        loading,
                        setEditing
                    }) => {

    return (
            <div className="textarea-container">
                <textarea
                    value={content}
                    onChange={handleChange}
                    aria-label="Edit note content"
                />
                <CharacterCounter content={trimmedContent} />
                <button
                    onClick={handleSave}
                    disabled={loading}
                    aria-label="Save the note"
                >
                    Save
                </button>
                <button
                    onClick={() => setEditing(false)}
                    disabled={loading}
                    aria-label="Cancel the editing"
                >
                    Cancel
                </button>
            </div>
    );
};

EditingState.propTypes = {
    content: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    trimmedContent: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    setEditing: PropTypes.func.isRequired
};

export default EditingState;