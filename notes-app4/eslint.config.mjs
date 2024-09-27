import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  // General files to be linted (including .js, .mjs, .cjs, .jsx)
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  
  // CommonJS files (for Node.js)
  {
    files: ["**/*.cjs", "**/*.js"],
    languageOptions: {
      sourceType: "commonjs",  // CommonJS modules (Node.js)
      globals: globals.node,   // Enable Node.js globals
    },
  },
  
  // ES Module files (for both browser and Node.js)
  {
    files: ["**/*.mjs", "**/*.js", "**/*.jsx"],  // Adjust according to file extensions
    languageOptions: {
      sourceType: "module",   // Enable ES Module syntax
      globals: {
        ...globals.browser,   // Browser globals (e.g., window, document)
        ...globals.node,      // Node.js globals (e.g., __dirname, process)
      },
    },
  },

  // Use recommended JS and React linting rules
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
