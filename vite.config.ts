
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Create a mock dev-server folder to prevent errors - use absolute path to ensure it's found
const devServerDir = path.resolve(__dirname, './dev-server');
if (!fs.existsSync(devServerDir)) {
  try {
    fs.mkdirSync(devServerDir, { recursive: true });
    fs.writeFileSync(
      path.join(devServerDir, 'package.json'), 
      JSON.stringify({ name: "dev-server-mock", version: "1.0.0" })
    );
  } catch (error) {
    console.warn("Could not create mock dev-server directory", error);
  }
}

// Also create a mock at the absolute path to handle direct references
try {
  if (!fs.existsSync('/dev-server')) {
    // This might fail due to permissions, which is fine
    fs.mkdirSync('/dev-server', { recursive: true });
    fs.writeFileSync(
      '/dev-server/package.json',
      JSON.stringify({ name: "dev-server-mock", version: "1.0.0" })
    );
  }
} catch (error) {
  // Ignore error, we'll use other methods to intercept the call
  console.warn("Could not create absolute mock dev-server directory", error);
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Strictly limit file access
      strict: true,
      allow: [process.cwd(), path.resolve('node_modules')]
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Add a virtual module plugin to intercept requests to /dev-server/package.json
    {
      name: 'mock-dev-server',
      resolveId(id) {
        if (id === '/dev-server/package.json' || id === 'dev-server/package.json') {
          return id;
        }
        return null;
      },
      load(id) {
        if (id === '/dev-server/package.json' || id === 'dev-server/package.json') {
          return `export default ${JSON.stringify({ name: "dev-server-mock", version: "1.0.0" })};`;
        }
        return null;
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Redirect any dev-server imports to our mock - both absolute and relative paths
      "/dev-server": devServerDir,
      "/dev-server/": devServerDir,
      "dev-server": devServerDir,
      "dev-server/": devServerDir
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion'
    ],
    exclude: ['dev-server'], // Explicitly exclude dev-server from optimization
    force: true,
    esbuildOptions: {
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.SKIP_DEV_SERVER': JSON.stringify("true")
      }
    }
  }
}));
