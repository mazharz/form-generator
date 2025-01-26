/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/form-generator",
  test: {
    globals: true, // Enables test globals like `expect` and `describe`
    environment: "jsdom", // Simulates a browser environment for React components
  },
});
