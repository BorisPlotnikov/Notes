// constants.js

// Define an object to hold different states for the application
const STATES = {
    // Represents the state when the user is editing content
    EDITING: 'editing',

    // Represents the state when the content is being displayed (view-only)
    DISPLAY: 'display'
};

// Define an object to hold minimum and maximum length constraints for notes
const LENGTHS = {
    // Minimum allowed length for the content
    MIN: 1,

    // Maximum allowed length for the content
    MAX: 200
}

// Export the STATES and LENGTHS objects so they can be used in other parts of the application
export { STATES, LENGTHS };
