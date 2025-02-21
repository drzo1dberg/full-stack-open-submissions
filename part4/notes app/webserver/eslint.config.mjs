import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest", // Setzt die ECMAScript-Version auf die neueste
      sourceType: "module", // Setzt den Quelltyp auf "module" für ES6-Module
      globals: globals.node, // Aktiviert globale Variablen für Node.js
    },
    rules: {
      // Hier kannst du deine spezifischen Regeln einfügen
    },
  },
  {
    files: [".eslintrc.{js,cjs}"],
    languageOptions: {
      sourceType: "script", // Setzt den Quelltyp auf "script" für spezielle ESLint-Konfigurationsdateien
      globals: globals.node, // Aktiviert globale Variablen für Node.js
    },
    env: {
      node: true, // Aktiviert die Node.js-Umgebung
    },
  },
  pluginJs.configs.recommended, // Verwendet die empfohlenen ESLint-Einstellungen
];
