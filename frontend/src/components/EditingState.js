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
                        handleCancel,
                        loading
                    }) => {

    return (
            <div className="textarea-container">
                <textarea
                    value={content}
                    onChange={handleChange}
                    aria-label="Edit note content"
                    autoFocus
                />
                <div className="character-counter">
                    <CharacterCounter content={trimmedContent} />
                </div>
                
                <div className="button-container">
                    <button
                        className="save"
                        onClick={handleSave}
                        disabled={loading}
                        aria-label="Save the note"
                    >
                        Save
                    </button>
                    
                    <button
                        className="cancel"
                        onClick={handleCancel}
                        disabled={loading}
                        aria-label="Cancel the editing"
                    >
                        Cancel
                    </button>
                </div>                

            </div>
    );
};

EditingState.propTypes = {
    content: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    trimmedContent: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default EditingState;

