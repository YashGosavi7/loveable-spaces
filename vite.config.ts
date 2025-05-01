
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Strictly limit file access to just the project directory
      strict: true,
      allow: [process.cwd()]
    },
  },
  // Use relative paths for everything
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
  // Explicitly define all paths relative to project root
  root: process.cwd(),
  envDir: process.cwd(),
  publicDir: path.join(process.cwd(), 'public'),
  cacheDir: '.vite',
  // Skip external package.json access entirely
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'react-helmet'
    ],
    // Force Vite to bundle these dependencies 
    force: true,
    // Only search for deps in our project folder
    entries: [
      '*.html', 
      'src/**/*.{ts,tsx,js,jsx}'
    ],
    // Completely disable scanning for dependencies outside the project
    scan: {
      include: ['src/**/*'],
      exclude: ['node_modules/**', '**/node_modules/**', '/dev-server/**']
    },
    // Prevent any external package.json lookups
    esbuildOptions: {
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      platform: 'browser'
    }
  }
}));
