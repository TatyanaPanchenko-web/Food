import { defineConfig } from "vite";
import observerPlugin from "mobx-react-observer/babel-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

// import { analyzer } from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          observerPlugin(
            // optional
            { exclude: ["src/ui-components/**"] }
          ),
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks: {
        // Вынесем React и React DOM в отдельный чанк
        // react: ["react", "react-dom"],
        // Вынесем библиотеки из node_modules
        // vendor: ['lodash', 'axios'],
        // },
        // Или используем функцию для более гибкого разделения
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) {
              return "firebase"; // создаст отдельный чанк для Firebase
            }
            if (id.includes("validator")) {
              return "validator"; // отдельный чанк для validator
            }

            return "vendor"; // все из node_modules — в один чанк
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "assets"),
    },
  },
});
