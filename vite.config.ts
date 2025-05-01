
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: "./", // Set root to current directory with explicit path format
  base: "/",
  publicDir: "public",
  server: {
    host: true, // Listen on all addresses
    port: 8080,
    strictPort: false, // Allow fallback to another port if 8080 is in use
    fs: {
      // Allow access to necessary directories
      allow: ['.', '..', '/'],
      strict: false
    },
    watch: {
      usePolling: true,
      interval: 1000, // Polling interval for better stability
    },
    hmr: {
      overlay: true,
      timeout: 5000, // Increase timeout
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve("index.html"),
      },
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // Use relative paths for cache and env to ensure they're found in the project directory
  cacheDir: path.resolve("./.vite"),
  envDir: path.resolve("./"),
  logLevel: 'info'
}));
