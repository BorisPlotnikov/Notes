// useNoteValidation.js

import { LENGTHS } from '../constants/constants';

const useNoteValidation = (contentLength) => {

    const isContentValid = contentLength >= LENGTHS.MIN && contentLength <= LENGTHS.MAX;
    const isNearMaxLength = contentLength >= LENGTHS.MAX - 20;

    return {
        isContentValid,
        isNearMaxLength
    };
};

export default useNoteValidation;

