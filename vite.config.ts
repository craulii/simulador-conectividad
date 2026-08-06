import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";

// Deployed as a GitHub Pages project site (craulii.github.io/simulador-conectividad),
// so every asset URL needs the repository name as its base path.
export default defineConfig({
  base: "/simulador-conectividad/",
  plugins: [react(), tailwindcss(), glsl()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
