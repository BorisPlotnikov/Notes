// components/CharacterCounter.js

import React from 'react';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import { LENGTHS } from '../../../constants';

import '../../../css';

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
                ? `Minimum ${LENGTHS.MIN} ${pluralize('character', LENGTHS.MIN)}`
                : contentLength >= LENGTHS.MAX
                ? `Maximum ${LENGTHS.MAX} ${pluralize('character', LENGTHS.MAX)}`
                : `${contentLength}/${LENGTHS.MAX}`
            }        
        </div>
    );
};

CharacterCounter.propTypes = {
    contentLength: PropTypes.number.isRequired,
    isNearMaxLength: PropTypes.bool.isRequired
};

export default CharacterCounter;
