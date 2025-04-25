
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set root to current directory to solve package.json resolution
  root: process.cwd(),
  // Use absolute paths for better resolution
  base: "/",
  server: {
    host: "localhost",
    port: 8080,
    fs: {
      // Allow serving files from parent directories
      allow: ['..', '.', '/'],
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
  },
  // Add extra configuration to help locate package.json
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
}));
