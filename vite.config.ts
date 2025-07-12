
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from "rollup-plugin-visualizer";
import { componentTagger } from "lovable-tagger";

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
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    server: {
      host: "::",
      port: 8080,
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
        "components": path.resolve(__dirname, "./src/components"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@ui": path.resolve(__dirname, "./src/components/ui"),
      },
    },
    
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  };
});
