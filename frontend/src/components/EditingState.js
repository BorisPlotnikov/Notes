// EditingState.js

import React from 'react';
import CharacterCounter from './CharacterCounter';
import '../css/EditingState.css';
import PropTypes from 'prop-types';

const EditingState = ({
                        content,
                        contentLength,
                        isContentValid,
                        isNearMaxLength,
                        onChange,
                        onSave,
                        onCancel,
                        loading,
                        textAreaRef
                    }) => {

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
                        onClick={onSave}
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
    contentLength: PropTypes.number.isRequired,
    isContentValid: PropTypes.bool.isRequired,
    isNearMaxLength: PropTypes.bool.isRequired,
};

export default EditingState;

