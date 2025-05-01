
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Advanced project root detection with better fallback mechanisms
function findProjectRoot() {
  // Expanded list of possible paths for package.json
  const possiblePaths = [
    process.cwd(),
    '/app',
    '/usr/src/app',
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '../..'),
    '/',
    '/workspace',
    '/home/node/app'
  ];
  
  // First check if any of these paths already have package.json
  for (const dir of possiblePaths) {
    try {
      if (fs.existsSync(path.join(dir, 'package.json'))) {
        console.log(`✅ Found valid package.json in ${dir}`);
        return dir;
      }
    } catch (err) {
      console.warn(`❌ Error checking path ${dir}:`, err.message);
    }
  }
  
  // No package.json found anywhere, use the current directory as fallback
  console.warn('⚠️ No package.json found in any expected location, using current directory');
  return process.cwd();
}

// Determine the actual project root
const PROJECT_ROOT = findProjectRoot();
console.log(`📂 Using project root: ${PROJECT_ROOT}`);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`🔄 Starting Vite in ${mode} mode using root: ${PROJECT_ROOT}`);
  
  return {
    // Use the detected project root for all paths
    root: PROJECT_ROOT,
    base: "/",
    publicDir: path.join(PROJECT_ROOT, "public"),
    
    // Enhanced server configuration for better flexibility
    server: {
      host: "0.0.0.0", // Listen on all interfaces
      port: 8080,
      strictPort: false, // Allow fallback to another port if 8080 is in use
      fs: {
        strict: false,
        // Allow access to multiple possible filesystem locations
        allow: [
          PROJECT_ROOT,
          "/",
          "/app",
          "/usr/src/app",
          process.cwd(),
          path.resolve(PROJECT_ROOT),
          path.resolve(PROJECT_ROOT, '..'),
          '..' // Allow access to parent directory
        ]
      },
      watch: {
        usePolling: true, // Better for container environments
        interval: 1000,
        ignored: ['**/node_modules/**', '**/dist/**']
      },
      hmr: {
        clientPort: 8080,
        overlay: true,
      }
    },
    
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    
    resolve: {
      alias: {
        "@": path.join(PROJECT_ROOT, "src"),
      },
      // Improve module resolution in containerized environments
      dedupe: ['react', 'react-dom']
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
    
    // Enhanced logging and performance optimizations
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      esbuildOptions: {
        target: 'esnext'
      }
    },
    
    // Ensure cache directory is within the project root
    cacheDir: path.join(PROJECT_ROOT, "node_modules/.vite"),
    
    logLevel: 'info',
  };
});
