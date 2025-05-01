
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Ensure we're using relative paths for everything
  cacheDir: './.vite-cache',
  base: './',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        }
      }
    }
  },
  // Explicitly set the root to the current directory to avoid path issues
  root: process.cwd(),
  // Ensure npm operations use the correct directory
  envDir: process.cwd(),
  // Explicitly define public dir to avoid confusion
  publicDir: path.resolve(process.cwd(), 'public'),
  // Ensure dependencies are properly pre-bundled
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'react-helmet'
    ],
    // Ensure dependencies are resolved from the project directory
    force: true
  }
}));
