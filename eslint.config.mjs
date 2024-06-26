import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  js.configs.recommended,

  {
    ignorePatterns: ["tests/**/*.test.js"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: "script",
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
];
