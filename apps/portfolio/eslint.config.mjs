import baseConfig from "@turbogen/eslint-config/base";
import nextjsConfig from "@turbogen/eslint-config/next";
import reactConfig from "@turbogen/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  {
    ignores: [".next/**", "!.next/types/**/*"],
    rules: {
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/require-await": "off",
      "import/consistent-type-specifier-style": "off"
    }
  }
];
