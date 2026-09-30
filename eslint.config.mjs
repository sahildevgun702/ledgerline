import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["node_modules/", "playwright-report/", "test-results/"] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
);
