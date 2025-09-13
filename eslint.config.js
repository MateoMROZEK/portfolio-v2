import js from "@eslint/js";
import * as tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import next from "eslint-plugin-next";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      next,
    },
    rules: {
      ...tsEslint.configs["recommended-type-checked"].rules,
      ...tsEslint.configs["stylistic-type-checked"].rules,

      // Tes règles personnalisées ici :
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      "@typescript-eslint/unbound-method": "off",
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      next,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
