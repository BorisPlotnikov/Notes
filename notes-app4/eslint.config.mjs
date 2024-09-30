import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  // Apply to all JS and JSX files
  {files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: {sourceType: "module"}},
  
  // CommonJS for specific files if needed (cjs files or older code)
  {files: ["**/*.cjs"], languageOptions: {sourceType: "commonjs"}},
  
  // Set browser globals
  {languageOptions: { globals: globals.browser }},
  
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
