
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Detect project root properly without using /dev-server
const PROJECT_ROOT = path.resolve(process.cwd());
console.log(`📂 Using project root: ${PROJECT_ROOT}`);

// https://vitejs.dev/config/
export default defineConfig({
  // Set the root to the current working directory
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
        path.resolve('.'),
        __dirname,
        '/app',
        '/workspace'
      ]
    },
    watch: {
      usePolling: false, // Reduced file system load
      interval: 1000,
    },
  },
  
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "src"),
    },
  },
  
  build: {
    // Improve caching and reduce build time
    emptyOutDir: true,
    outDir: path.resolve(PROJECT_ROOT, "dist"),
    // Enable caching to speed up builds
    reportCompressedSize: false, // Faster build
    chunkSizeWarningLimit: 1000, // Increase limit to reduce warnings
    rollupOptions: {
      input: {
        main: path.resolve(PROJECT_ROOT, "index.html"),
      },
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
        },
      }
    }
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
  // Move cache directory to project root for better sandbox compatibility
  cacheDir: path.resolve(PROJECT_ROOT, "node_modules/.vite"),
});
