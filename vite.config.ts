
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

/**
 * Find the project root by checking for package.json in various locations
 * This eliminates all references to /dev-server which is causing the errors
 */
function findProjectRoot() {
  // First, check the current working directory and immediate paths
  const currentDir = process.cwd();
  console.log(`Current working directory: ${currentDir}`);
  
  // Common locations to check for package.json
  const possiblePaths = [
    currentDir,
    path.resolve(currentDir),
    path.resolve(__dirname),
    path.resolve('.'),
    '/app',
    '/workspace',
    '/usr/src/app',
    path.join(currentDir, '..'),
    '/'
  ];
  
  console.log('🔍 Checking for package.json in possible locations:');
  possiblePaths.forEach(dir => console.log(`   - ${dir}`));
  
  // Check each location for package.json
  for (const dir of possiblePaths) {
    try {
      const packageJsonPath = path.join(dir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        console.log(`✅ Found valid package.json at: ${packageJsonPath}`);
        return dir;
      }
    } catch (err) {
      console.warn(`❌ Error checking path ${dir}: ${err.message}`);
    }
  }
  
  // If no package.json found anywhere, fallback to current directory
  console.warn('⚠️ No package.json found in any location. Using current directory as fallback.');
  return currentDir;
}

// Determine the actual project root
const PROJECT_ROOT = findProjectRoot();
console.log(`📂 Using project root: ${PROJECT_ROOT}`);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`🔄 Starting Vite in ${mode} mode from ${PROJECT_ROOT}`);
  
  return {
    root: PROJECT_ROOT,
    base: "/",
    publicDir: path.join(PROJECT_ROOT, "public"),
    
    // Enhanced server configuration
    server: {
      host: "0.0.0.0",
      port: 8080,
      strictPort: false,
      fs: {
        strict: false,
        // Allow all relevant paths
        allow: [
          PROJECT_ROOT, 
          '/',
          process.cwd(),
          path.resolve('.'),
          path.resolve('..'),
          __dirname,
          '/app',
          '/workspace',
          '/usr/src/app'
        ]
      },
      watch: {
        usePolling: true,
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
    
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      esbuildOptions: {
        target: 'esnext'
      }
    },
    
    cacheDir: path.join(PROJECT_ROOT, "node_modules/.vite"),
    
    logLevel: 'info',
  };
});
