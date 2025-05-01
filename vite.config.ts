
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

/**
 * Project root detection with robust fallbacks
 * No references to /dev-server anywhere in the code
 */
function findProjectRoot() {
  // Logging the current directory for debugging
  console.log(`Current working directory: ${process.cwd()}`);
  console.log(`__dirname: ${__dirname}`);
  
  // Try multiple approaches to find the project root
  const candidateRoots = [
    process.cwd(),
    __dirname,
    path.resolve(__dirname, '..'),
    path.resolve('.'),
    path.resolve('..'),
    '/app',
    '/workspace',
    '/'
  ];
  
  // First strategy: Look for package.json
  for (const dir of candidateRoots) {
    try {
      const packagePath = path.join(dir, 'package.json');
      if (fs.existsSync(packagePath)) {
        console.log(`✅ Found valid package.json at: ${packagePath}`);
        return dir;
      }
    } catch (error) {
      // Ignore errors and try next path
    }
  }
  
  // Second strategy: Look for index.html
  for (const dir of candidateRoots) {
    try {
      const indexPath = path.join(dir, 'index.html');
      if (fs.existsSync(indexPath)) {
        console.log(`✅ Found index.html at: ${indexPath}`);
        return dir;
      }
    } catch (error) {
      // Ignore errors and try next path
    }
  }
  
  // Third strategy: Look for src directory
  for (const dir of candidateRoots) {
    try {
      const srcPath = path.join(dir, 'src');
      if (fs.existsSync(srcPath)) {
        console.log(`✅ Found src directory at: ${srcPath}`);
        return dir;
      }
    } catch (error) {
      // Ignore errors and try next path
    }
  }
  
  // Fallback to current directory
  console.warn('⚠️ Could not determine project root, using current directory');
  return process.cwd();
}

// Determine project root once at startup
const PROJECT_ROOT = findProjectRoot();
console.log(`📂 Using project root: ${PROJECT_ROOT}`);

// https://vitejs.dev/config/
export default defineConfig({
  root: PROJECT_ROOT,
  base: "/",
  publicDir: path.resolve(PROJECT_ROOT, "public"),
  
  plugins: [
    react(),
    componentTagger(),
  ],
  
  server: {
    host: "0.0.0.0",
    port: 8080,
    fs: {
      strict: false,
      allow: [
        PROJECT_ROOT,
        process.cwd(),
        path.resolve('.'),
        __dirname,
        '/app',
        '/workspace'
      ]
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "src"),
    },
  },
  
  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(PROJECT_ROOT, "index.html"),
      },
    }
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
  cacheDir: path.resolve(PROJECT_ROOT, "node_modules/.vite"),
});
