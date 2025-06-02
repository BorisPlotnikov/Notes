// useNoteValidation.js

// import { useState } from 'react';
import { LENGTHS } from '../constants/constants';

const useNoteValidation = (content) => {

    const trimmedContent = content.trim();
    const length = trimmedContent.length;
    const isContentValid = length >= LENGTHS.MIN && length <= LENGTHS.MAX;
    const isNearMaxLength = length <= LENGTHS.MAX - 20;

    return {
        trimmedContent,
        isContentValid,
        isNearMaxLength,
    };
};

export default useNoteValidation;

