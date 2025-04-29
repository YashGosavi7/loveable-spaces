
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Explicitly set root to current directory
  root: process.cwd(),
  base: "/",
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
      interval: 1000, // Increase polling interval for better stability
    },
    hmr: {
      // Make HMR more resilient
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
        main: path.resolve('index.html'),
      },
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // Add this to make Vite look for package.json in the current directory
  cacheDir: '.vite',
  // Ensure proper directory access
  envDir: process.cwd(),
  // Add better error logging
  logLevel: 'info'
}));
