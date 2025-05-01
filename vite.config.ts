
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

/**
 * Enhanced project root detection that completely eliminates /dev-server references
 * and properly handles various deployment environments
 */
function findProjectRoot() {
  // Comprehensive list of possible project root locations in priority order
  const possiblePaths = [
    process.cwd(),
    path.resolve(process.cwd()),
    path.resolve(__dirname),
    path.resolve('.'),
    '/app',
    '/usr/src/app',
    path.resolve(process.cwd(), '..'),
    '/workspace',
    '/home/node/app'
  ];
  
  console.log('🔍 Searching for package.json in these locations:');
  possiblePaths.forEach(p => console.log(`   - ${p}`));
  
  // Find the first valid path with a package.json
  for (const dir of possiblePaths) {
    try {
      const packageJsonPath = path.join(dir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        console.log(`✅ Found valid package.json in ${dir}`);
        return dir;
      }
    } catch (err) {
      console.warn(`❌ Error checking path ${dir}:`, err.message);
    }
  }

  // Fallback to current working directory if no package.json found
  console.log('⚠️ No package.json found, using current working directory as fallback');
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
    
    // Enhanced server configuration with more permissive file access
    server: {
      host: "0.0.0.0", // Listen on all interfaces
      port: 8080,
      strictPort: false,
      fs: {
        strict: false,
        allow: [
          PROJECT_ROOT,
          "/",
          "/app",
          "/usr/src/app",
          process.cwd(),
          path.resolve(PROJECT_ROOT),
          path.resolve(PROJECT_ROOT, '..'),
          '..'
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
