// EditingState.js

import React from 'react';
import CharacterCounter from './CharacterCounter';
import useNoteValidation from '../hooks/useNoteValidation';
import '../css/EditingState.css';
import PropTypes from 'prop-types';

const EditingState = ({
                        content,
                        onChange,
                        onSave,
                        onCancel,
                        loading,
                        textAreaRef
                    }) => {

    const trimmedContent = content.trim();
    const contentLength = trimmedContent?.length || 0;

    
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
                        onChange={onChange}
                        aria-label="Edit note content"
                    />
                    <CharacterCounter 
                        contentLength={contentLength} 
                        isNearMaxLength={isNearMaxLength} 
                    />
                </div>
                
                <div className="button-container">
                    <button
                        className="save"
                        onClick={() => onSave(trimmedContent)}
                        disabled={loading || !isContentValid}
                        aria-label={loading ? "Saving the note..." : "Save note"}
                    >
                        Save
                    </button>
                    
                    <button
                        className="cancel"
                        onClick={onCancel}
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
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    textAreaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired,
};

export default EditingState;

