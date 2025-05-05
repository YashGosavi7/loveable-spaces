
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Create a mock dev-server folder to prevent errors
// Use current project as base
const devServerDir = path.resolve(__dirname, './dev-server');

// Create the mock directory structure synchronously before anything else
try {
  // Ensure the directory exists
  if (!fs.existsSync(devServerDir)) {
    fs.mkdirSync(devServerDir, { recursive: true });
  }
  
  // Create a basic package.json
  fs.writeFileSync(
    path.join(devServerDir, 'package.json'),
    JSON.stringify({ name: "dev-server-mock", version: "1.0.0", main: "index.js" })
  );
  
  // Create a basic index.js with exports
  fs.writeFileSync(
    path.join(devServerDir, 'index.js'),
    `// Mock dev-server module
module.exports = {
  version: "1.0.0",
  name: "dev-server-mock",
  isRunning: false,
  start: () => console.log("Mock dev server started"),
  stop: () => console.log("Mock dev server stopped"),
  getStatus: () => ({ status: "mocked" }),
  isAvailable: () => true,
  connect: () => Promise.resolve(true),
  disconnect: () => Promise.resolve(true)
};`
  );
} catch (error) {
  console.warn("Could not create mock dev-server files:", error);
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
    // Virtual module plugin to intercept any request to dev-server
    {
      name: 'mock-dev-server',
      resolveId(id) {
        // Intercept all variations of dev-server paths
        if (id.includes('dev-server')) {
          if (id === '/dev-server' || id === 'dev-server') {
            return path.resolve(devServerDir, 'index.js');
          }
          if (id === '/dev-server/package.json' || id === 'dev-server/package.json') {
            return path.resolve(devServerDir, 'package.json');
          }
          return id; // Return the id to allow normal resolution through alias
        }
        return null;
      },
      load(id) {
        // Provide virtual content for dev-server files
        if (id.includes('dev-server/package.json') || id === '/dev-server/package.json') {
          return `export default ${JSON.stringify({ name: "dev-server-mock", version: "1.0.0", main: "index.js" })};`;
        }
        if (id.includes('dev-server') && id.endsWith('.js')) {
          return `
            // Mock dev-server module
            export const version = "1.0.0";
            export const name = "dev-server-mock";
            export const isRunning = false;
            export function start() { console.log("Mock dev server started"); }
            export function stop() { console.log("Mock dev server stopped"); }
            export function getStatus() { return { status: "mocked" }; }
            export function isAvailable() { return true; }
            export function connect() { return Promise.resolve(true); }
            export function disconnect() { return Promise.resolve(true); }

            const mockDevServer = {
              version: "1.0.0",
              name: "dev-server-mock",
              isRunning: false,
              start: () => console.log("Mock dev server started"),
              stop: () => console.log("Mock dev server stopped"),
              getStatus: () => ({ status: "mocked" }),
              isAvailable: () => true,
              connect: () => Promise.resolve(true),
              disconnect: () => Promise.resolve(true)
            };

            export default mockDevServer;
          `;
        }
        return null;
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Redirect ALL variations of dev-server imports to our mock
      "/dev-server": devServerDir,
      "/dev-server/": devServerDir,
      "dev-server": devServerDir,
      "dev-server/": devServerDir,
      // Even more specific aliases
      "/dev-server/package.json": path.join(devServerDir, 'package.json'),
      "dev-server/package.json": path.join(devServerDir, 'package.json')
    }
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
  },
  // Completely prevent filesystem access to /dev-server path during build
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // Externalize problematic modules
      external: ['/dev-server', 'dev-server'],
      onwarn(warning, warn) {
        // Ignore warnings about missing external modules
        if (warning.code === 'MODULE_NOT_FOUND' && 
            (warning.message?.includes('dev-server') || 
             warning.message?.includes('/dev-server'))) {
          return;
        }
        warn(warning);
      }
    }
  }
}));
