import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigNext from "eslint-config-next";

const eslintConfig = defineConfig([
  eslintConfigNext,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
