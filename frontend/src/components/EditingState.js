// EditingState.js

import React from 'react';
import CharacterCounter from './CharacterCounter';
import useNoteValidation from '../hooks/useNoteValidation';
import '../css/EditingState.css';
import PropTypes from 'prop-types';

const EditingState = ({
                        content,
                        handleChange,
                        trimmedContent,
                        handleSave,
                        handleCancel,
                        loading,
                        textAreaRef
                    }) => {
    const contentLength = trimmedContent.length;
    
    const {
        isContentValid,
        isNearMaxLength,
    } = useNoteValidation(contentLength);

    return (
            <div className="textarea-container">

                <div className="input-wrapper">
                    <textarea
                        value={content}
                        ref={textAreaRef}
                        onChange={handleChange}
                        aria-label="Edit note content"
                    />
                    <div className="character-counter">
                        <CharacterCounter 
                            contentLength={contentLength} 
                            isNearMaxLength={isNearMaxLength} 
                        />
                    </div>
                </div>
                
                <div className="button-container">
                    <button
                        className="save"
                        onClick={handleSave}
                        disabled={loading || !isContentValid}
                        aria-label={loading ? "Saving the note..." : "Save note"}
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
    handleCancel: PropTypes.func.isRequired,
    textAreaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired,
};

export default EditingState;

