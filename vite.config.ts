
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Advanced project root detection with directory creation capability
function findProjectRoot() {
  // Expanded list of possible paths for package.json
  const possiblePaths = [
    process.cwd(),
    '/app',
    '/usr/src/app',
    '/dev-server',
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
  
  // If no package.json found, try to use the dev-server directory
  // and handle its existence appropriately
  const devServerPath = '/dev-server';
  try {
    // Check if dev-server directory exists
    if (fs.existsSync(devServerPath)) {
      console.log(`✅ Using dev-server directory at ${devServerPath}`);
      
      // Check if it has package.json
      if (!fs.existsSync(path.join(devServerPath, 'package.json'))) {
        console.log(`🔧 Note: No package.json found in ${devServerPath}, but the directory exists`);
      }
      return devServerPath;
    } else {
      console.warn(`❌ Dev server directory not found at ${devServerPath}`);
    }
  } catch (err) {
    console.error(`❌ Error accessing dev-server directory:`, err.message);
  }
  
  // Default fallback to current directory if nothing else works
  console.warn('⚠️ No suitable project root found, defaulting to current directory');
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
          "/dev-server",
          "/workspace",
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
    
    // Ensure cache directory is available
    cacheDir: (() => {
      const dir = path.join(PROJECT_ROOT, ".vite");
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`✅ Created cache directory: ${dir}`);
        }
        return dir;
      } catch (err) {
        console.warn(`⚠️ Could not create cache directory at ${dir}:`, err.message);
        return './.vite'; // Fallback
      }
    })(),
    
    logLevel: 'info',
    
    // Improved error handling
    customLogger: {
      info: (msg) => console.log(`ℹ️ ${msg}`),
      warn: (msg) => console.warn(`⚠️ ${msg}`),
      error: (msg) => console.error(`❌ ${msg}`),
      warnOnce: (msg) => console.warn(`⚠️ (once) ${msg}`),
    },
  };
});
