// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";
// import globals from "globals";
// import tseslint from "@typescript-eslint/eslint-plugin";
// import parserTs from "@typescript-eslint/parser";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// export default [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     files: ["**/*.{js,mjs,cjs,ts,tsx}"],
//     languageOptions: {
//       globals: { ...globals.browser, ...globals.node },
//       parser: parserTs,
//       parserOptions: {
//         ecmaVersion: 2021,
//         sourceType: "module",
//         project: "./tsconfig.json",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": tseslint,
//     },
//     rules: {
//       ...tseslint.configs.recommended.rules,
//       "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
//       "@typescript-eslint/no-require-imports": "error",
//     },
//   },
//   {
//     ignores: ["app/generated/**", "node_modules/**", ".next/**"],
//   },
// ];




import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-require-imports": "error",
    },
  },
  {
    ignores: ["app/generated/**", "node_modules/**", ".next/**"],
  },
];