
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Determine project root based on where package.json exists
function findProjectRoot() {
  // Common locations where package.json might be found in containerized environments
  const possiblePaths = [
    process.cwd(),
    '/app',
    '/usr/src/app',
    '/dev-server',
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '../..'),
  ];
  
  for (const dir of possiblePaths) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      console.log(`Found package.json in ${dir}`);
      return dir;
    }
  }
  
  // Default to current directory if not found elsewhere
  console.warn('No package.json found in common locations, defaulting to current working directory');
  return process.cwd();
}

const PROJECT_ROOT = findProjectRoot();
console.log(`Using project root: ${PROJECT_ROOT}`);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use the detected project root for all paths
  root: PROJECT_ROOT,
  base: "/",
  publicDir: "public",
  
  // Enhanced server configuration for better Docker compatibility
  server: {
    host: "0.0.0.0", // Listen on all available network interfaces
    port: 8080,
    strictPort: true,
    fs: {
      strict: false,
      // Allow access to multiple possible file system locations
      allow: [
        "/",
        "/app",
        "/usr/src/app",
        "/dev-server",
        PROJECT_ROOT,
        path.resolve(PROJECT_ROOT)
      ]
    },
    watch: {
      usePolling: true, // Better for Docker/containers
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
      "@": path.resolve(PROJECT_ROOT, "src"),
    }
  },
  
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(PROJECT_ROOT, "index.html"),
      },
    }
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  
  cacheDir: path.resolve(PROJECT_ROOT, ".vite"),
  envDir: PROJECT_ROOT,
  logLevel: 'info',
}));
