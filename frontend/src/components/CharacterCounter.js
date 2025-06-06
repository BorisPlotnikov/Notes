// CharacterCounter.js

import React from 'react';
import { LENGTHS } from '../constants/constants';
import '../css/CharacterCounter.css';
import PropTypes from 'prop-types';

const CharacterCounter = ({ contentLength = 0, isNearMaxLength = false }) => {

    return (
        <div
            id="character-counter"
            className={`character-counter ${isNearMaxLength ? 'warning' : ''}`}
            aria-live="polite"
            aria-label="Character count"
        >
            {
                contentLength < LENGTHS.MIN
                ?  `Minimum ${LENGTHS.MIN} ${LENGTHS.MIN === 1 ? "character" : "characters"}`
                : contentLength >= LENGTHS.MAX
                ? `Maximum ${LENGTHS.MAX} ${LENGTHS.MAX === 1 ? "character" : "characters"}`
                : `${contentLength}/${LENGTHS.MAX}`
            }        
        </div>
    );
};

CharacterCounter.propTypes = {
    contentLength: PropTypes.number.isRequired
};

export default CharacterCounter;
