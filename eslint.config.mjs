// eslint.config.mjs

import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintPluginImport from "eslint-plugin-import"; // <-- import the plugin
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, import: eslintPluginImport }, // <-- add import plugin here
    extends: ["js/recommended"],
    rules: {
      // import order rule added here
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["backend/**/*.js", "apiConfig.js"],
    env: { node: true },
  },
  pluginReact.configs.flat.recommended,
]);
