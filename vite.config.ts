
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use absolute path for root to ensure correct file resolution
  root: process.cwd(),
  base: "/",
  publicDir: "public",
  
  // Enhanced server configuration for better Docker compatibility
  server: {
    host: "0.0.0.0", // Listen on all available network interfaces
    port: 8080,
    strictPort: true,
    fs: {
      strict: false,
      allow: ["/", path.resolve(process.cwd())] // Use absolute paths
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      clientPort: 8080, // Force the client to connect to port 8080
      overlay: true,
      timeout: 5000,
    }
  },
  
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    }
  },
  
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(process.cwd(), "index.html"),
      },
    }
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  
  cacheDir: path.resolve(process.cwd(), ".vite"),
  envDir: process.cwd(),
  logLevel: 'info',
}));
