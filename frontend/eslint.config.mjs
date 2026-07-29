import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Эх (React+Vite) кодын markup/текстийг байтаар хадгалах зарчмын дагуу —
      // '/" тэмдэгтүүдийг escape хийхгүй, browser API (Bluetooth/Gamepad) type-уудад any зөвшөөрнө.
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
