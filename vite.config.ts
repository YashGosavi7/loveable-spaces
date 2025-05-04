
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Create a mock dev-server folder to prevent errors
const devServerDir = path.resolve(__dirname, './node_modules/dev-server');
if (!fs.existsSync(devServerDir)) {
  fs.mkdirSync(devServerDir, { recursive: true });
  fs.writeFileSync(
    path.join(devServerDir, 'package.json'), 
    JSON.stringify({ name: "dev-server-mock", version: "1.0.0" })
  );
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Strictly limit file access
      strict: true,
      allow: [process.cwd()]
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Redirect any dev-server imports to our mock
      "/dev-server": devServerDir,
      "dev-server": devServerDir
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
    force: true,
    esbuildOptions: {
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode)
      }
    }
  }
}));
