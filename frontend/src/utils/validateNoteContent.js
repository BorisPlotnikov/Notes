// /src/utils/validateNoteContent.js

import { LENGTHS } from '../constants';

/**
 * Validates note content.
 * @param {string} content
 * @param {string} [originalContent] - Optional: used to detect if content is unchanged
 * @returns {{
 * trimmedContent: string,
 * contentLength: number,
 * isLengthValid: boolean,
 * isUnchanged: boolean,
 * isValid: boolean,
 * isNearMaxLength: boolean
 * }}
 */

const validateNoteContent = (content, originalContent = '') => {
    const trimmedContent = content.trim();
    const contentLength = content.length;

    const isLengthValid =
      contentLength >= LENGTHS.MIN && contentLength <=LENGTHS.MAX;

    const isUnchanged = originalContent !== undefined && content === originalContent;
    const isNearMaxLength = contentLength >= 180;

    const isValid = isLengthValid && !isUnchanged;

    return {
        trimmedContent,
        contentLength,
        isLengthValid,
        isUnchanged,
        isNearMaxLength,
        isValid,
    };
};

export default validateNoteContent;