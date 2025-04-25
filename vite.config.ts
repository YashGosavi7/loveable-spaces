
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set root directory explicitly as current working directory
  root: ".",
  base: "/",
  server: {
    host: "localhost",
    port: 8080,
    fs: {
      // Expand allowed directories to ensure package.json is accessible
      allow: ['.', '..', '../..', '/'],
      strict: false
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    }
  },
  optimizeDeps: {
    // Ensure dependencies are properly scanned and included
    include: ['react', 'react-dom', 'react-router-dom']
  }
}));
