
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Improved project root detection with better containerized environment support
function findProjectRoot() {
  // Possible paths for package.json in various container setups
  const possiblePaths = [
    process.cwd(),
    '/app',
    '/usr/src/app',
    '/dev-server',
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '../..'),
    '/'
  ];
  
  for (const dir of possiblePaths) {
    try {
      // Check if package.json exists and is readable in this location
      if (fs.existsSync(path.join(dir, 'package.json'))) {
        console.log(`Found valid package.json in ${dir}`);
        return dir;
      }
    } catch (err) {
      console.warn(`Error checking path ${dir}:`, err.message);
    }
  }
  
  // If we reach here, we couldn't find a package.json
  console.warn('No package.json found in common locations, defaulting to current directory');
  return process.cwd();
}

// Determine the actual project root
const PROJECT_ROOT = findProjectRoot();
console.log(`Using project root: ${PROJECT_ROOT}`);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use the detected project root for all paths
  root: PROJECT_ROOT,
  base: "/",
  publicDir: path.join(PROJECT_ROOT, "public"),
  
  // Enhanced server configuration for better Docker compatibility
  server: {
    host: "0.0.0.0", // Listen on all interfaces
    port: 8080,
    strictPort: true,
    fs: {
      strict: false,
      // Allow access to multiple possible filesystem locations
      allow: [
        PROJECT_ROOT,
        "/",
        "/app",
        "/usr/src/app",
        "/dev-server",
        path.resolve(PROJECT_ROOT)
      ]
    },
    watch: {
      usePolling: true, // Better for container environments
      interval: 1000,
    },
    hmr: {
      clientPort: 8080,
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
      "@": path.join(PROJECT_ROOT, "src"),
    }
  },
  
  build: {
    outDir: path.join(PROJECT_ROOT, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.join(PROJECT_ROOT, "index.html"),
      },
    }
  },
  
  // Add detailed logging to help troubleshoot path issues
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  
  cacheDir: path.join(PROJECT_ROOT, ".vite"),
  logLevel: 'info',
}));
