import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Check if we're in production mode
  const isProduction = mode === 'production';

  // Define the base configuration
  const config = {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          // svgr options
        },
      }),
    ],
    server: {
      open: true,
    },
    build: {
      sourcemap: !isProduction, // Enable sourcemaps in non-production environments
    },
  };

  // Add visualizer plugin only in production for analysis
  if (isProduction) {
    config.plugins.push(
      visualizer({
        template: "treemap", // or sunburst
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  return {
    ...config,
    
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Ensure components/ui can be resolved directly
        "components": path.resolve(__dirname, "./src/components"),
        "@components": path.resolve(__dirname, "./src/components"),
        // Use proper path for UI components, not a directory
        "@ui": path.resolve(__dirname, "./src/components/ui"),
        // Add an alias for dev-server to point to a mock
        "dev-server": path.resolve(__dirname, "./src/mock-dev-server"),
      },
    },
    
    
    build: {
      
      
      rollupOptions: {
        
        
        output: {
          
          
          // Break down chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@/components/ui/button', '@/components/ui/card'] // Fix: specify actual files, not directory
          },
        },
      },
    },
    
    
  };
});
