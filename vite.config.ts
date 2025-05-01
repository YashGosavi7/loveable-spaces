
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

/**
 * Simple project root detection that avoids any references to /dev-server
 * which appears to be causing the errors
 */
function findProjectRoot() {
  // Start with the most likely locations
  const possiblePaths = [
    process.cwd(),
    __dirname,
    path.resolve('.'),
    path.resolve('..'),
    '/app',
    '/workspace'
  ];
  
  console.log('🔍 Looking for package.json in these locations:');
  for (const dir of possiblePaths) {
    try {
      const packageJsonPath = path.join(dir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        console.log(`✅ Found package.json at: ${packageJsonPath}`);
        return dir;
      }
    } catch (err) {
      // Silently continue to next path
    }
  }
  
  // If we couldn't find it, use current directory as fallback
  console.warn('⚠️ Could not locate package.json - using current directory');
  return process.cwd();
}

// Get project root without dev-server references
const PROJECT_ROOT = findProjectRoot();
console.log(`📂 Using project root: ${PROJECT_ROOT}`);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`🔄 Starting Vite in ${mode} mode`);
  
  return {
    root: PROJECT_ROOT,
    base: "/",
    publicDir: path.join(PROJECT_ROOT, "public"),
    
    // Simplified server configuration
    server: {
      host: "0.0.0.0",
      port: 8080,
      fs: {
        strict: false,
        allow: [PROJECT_ROOT, process.cwd(), path.resolve('.'), __dirname, '/app', '/workspace']
      },
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
    
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    
    resolve: {
      alias: {
        "@": path.join(PROJECT_ROOT, "src"),
      },
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
    },
    
    cacheDir: path.join(PROJECT_ROOT, "node_modules/.vite"),
  };
});
