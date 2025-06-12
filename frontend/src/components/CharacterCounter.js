// components/CharacterCounter.js

import React from 'react';
import pluralize from 'pluralize';
import { LENGTHS } from '../constants/constants';
import '../css/CharacterCounter.css';
import PropTypes from 'prop-types';

const CharacterCounter = ({ contentLength, isNearMaxLength = false }) => {

    return (
        <div
            id="character-counter"
            className={`character-counter ${isNearMaxLength ? 'warning' : ''}`}
            aria-live="polite"
            aria-label="Character count"
        >
            {
                contentLength < LENGTHS.MIN
                ?  `Minimum ${LENGTHS.MIN} ${pluralize('character', LENGTHS.MIN)}`
                : contentLength >= LENGTHS.MAX
                ? `Maximum ${LENGTHS.MAX} ${pluralize('character', LENGTHS.MAX)}`
                : `${contentLength}/${LENGTHS.MAX}`
            }        
        </div>
    );
};

CharacterCounter.propTypes = {
    contentLength: PropTypes.number.isRequired
};

export default CharacterCounter;
