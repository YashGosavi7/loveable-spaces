
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

/**
 * Enhanced project root detection without any dev-server references
 * This is a complete rewrite of the function to avoid the ENOENT error
 */
function determineProjectRoot() {
  // Hardcoded potential locations to check for package.json
  const potentialRoots = [
    process.cwd(),
    __dirname,
    path.resolve(__dirname, '..'),
    path.resolve('.'),
    path.resolve('..'),
    '/app',
    '/workspace',
    path.join(process.cwd(), '..'),
    '/'
  ];
  
  console.log('🔍 Starting exhaustive search for project root...');
  
  // First pass - look for package.json
  for (const dir of potentialRoots) {
    try {
      const packageJsonPath = path.join(dir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        console.log(`✅ Found package.json at: ${packageJsonPath}`);
        // Read package to verify it's valid
        try {
          const packageContent = fs.readFileSync(packageJsonPath, 'utf8');
          JSON.parse(packageContent); // Verify it's valid JSON
          console.log(`✓ Validated package.json at ${packageJsonPath}`);
          return dir;
        } catch (err) {
          console.log(`⚠️ Found but couldn't parse package.json at ${packageJsonPath}`);
          // Continue to next path if this one has invalid JSON
        }
      }
    } catch (err) {
      // Silently continue to next path
    }
  }

  // Second pass - look for index.html as fallback
  for (const dir of potentialRoots) {
    try {
      if (fs.existsSync(path.join(dir, 'index.html'))) {
        console.log(`✅ Using directory with index.html: ${dir}`);
        return dir;
      }
    } catch (err) {
      // Silently continue to next path
    }
  }
  
  // Last resort - use current directory
  console.warn('⚠️ Could not locate package.json or index.html - falling back to current working directory');
  return process.cwd();
}

// Get project root without any dev-server references
const PROJECT_ROOT = determineProjectRoot();
console.log(`📂 Project root determined: ${PROJECT_ROOT}`);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`🔄 Initializing Vite in ${mode} mode`);
  
  return {
    root: PROJECT_ROOT,
    base: "/",
    publicDir: path.resolve(PROJECT_ROOT, "public"),
    
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
    
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    
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
  };
});
