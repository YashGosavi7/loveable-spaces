
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
  // Use relative paths instead of absolute paths
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
  // Tell Vite to use the current working directory as the project root
  root: process.cwd(),
  // Explicitly define the environment directory to avoid confusion
  envDir: process.cwd(),
  // Explicitly define the public directory
  publicDir: path.resolve(process.cwd(), 'public'),
  // Ensure all dependencies are properly pre-bundled
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'react-helmet'
    ],
    // Force dependency pre-bundling from the project directory
    force: true
  },
  // Prevent the build from looking for non-existent directories
  cacheDir: path.join(process.cwd(), '.vite-cache'),
  // Ensure the correct package.json is used
  packageCache: {
    dir: process.cwd()
  }
}));
