import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import unicornPlugin from "eslint-plugin-unicorn";
import js from "@eslint/js";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"], // ← Add support for .tsx, .js, .jsx
    ignores: ["dist/**/*", "node_modules/**/*"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node,
        ...globals.browser // add browser globals for React if needed
      }
    },

    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
      unicorn: unicornPlugin
    },

    rules: {
      "prettier/prettier": "error",
      "no-console": "off",
      "no-shadow": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/ban-types": ["error", {
        types: {
          "{}": false
        }
      }],
      "unicorn/filename-case": ["off", { case: "camelCase" }]
    }
  }
]);
