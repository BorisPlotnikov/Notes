// CharacterCounter.js

import React from 'react';
import useNoteValidation from '../hooks/useNoteValidation';
import { LENGTHS } from '../constants/constants';
import '../css/CharacterCounter.css';
import PropTypes from 'prop-types';

const CharacterCounter = ({ content = '' }) => {
    const {
        length,
        isNearMaxLength
    } = useNoteValidation(content);

    return (
        <div
            id="character-counter"
            className={`character-counter ${isNearMaxLength ? 'warning' : ''}`}
            aria-live="polite"
            aria-label="Character count"
        >
            {
                length < LENGTHS.MIN
                ?  `Minimum ${LENGTHS.MIN} characters`
                : length >= LENGTHS.MAX
                ? `Maximum ${LENGTHS.MAX} characters`
                : `${length}/${LENGTHS.MAX}`
            }        
        </div>
    );
};

CharacterCounter.propTypes = {
    content: PropTypes.string
};

export default CharacterCounter;
