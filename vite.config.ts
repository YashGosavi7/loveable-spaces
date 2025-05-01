
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
    // Ensure no external lookups
    preserveSymlinks: true,
    // Only look in allowed locations
    conditions: ['browser', 'module', 'import', 'default']
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
  cacheDir: path.join(process.cwd(), '.vite'),
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
      exclude: [
        'node_modules/**', 
        '**/node_modules/**', 
        '/dev-server/**',
        '**/dev-server/**',
        'dev-server'
      ]
    },
    // Prevent any external package.json lookups
    esbuildOptions: {
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      platform: 'browser',
      mainFields: ['browser', 'module', 'main'],
      conditions: ['browser', 'import', 'default'],
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode)
      },
      // Skip all external module resolution
      external: ['/dev-server/**', '/dev-server/package.json']
    }
  }
}));
