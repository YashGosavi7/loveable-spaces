
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use relative path to ensure the package.json is found
  root: '.',
  base: "/",
  publicDir: "public",
  server: {
    host: true, // Listen on all addresses
    port: 8080,
    strictPort: false, // Allow fallback to another port if 8080 is in use
    fs: {
      // Always allow access to upper directories to find package.json
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
      "@": path.resolve(".", "src"),
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(".", "index.html"),
      },
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // Use relative paths for cache and env directories
  cacheDir: "./.vite",
  envDir: ".",
  logLevel: 'info'
}));
