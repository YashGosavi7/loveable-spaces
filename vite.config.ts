
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Simple project root detection without any references to /dev-server
const PROJECT_ROOT = process.cwd();
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
        path.resolve('.'),
        __dirname,
        '/app',
        '/workspace'
      ]
    },
    watch: {
      usePolling: false, // Changed from true to reduce file system load
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
