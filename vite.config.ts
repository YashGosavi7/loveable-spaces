
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
  
  // Get the project root directory
  const root = process.cwd();
  
  // Define relative path to mock-dev-server to ensure it works correctly
  const mockDevServerPath = path.join(root, 'src', 'mock-dev-server');

  // Define the base configuration
  const config = {
    root, // Explicitly set the root directory
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
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..', '.', path.resolve(root)]
      }
    },
    build: {
      sourcemap: !isProduction, // Enable sourcemaps in non-production environments
      outDir: path.resolve(root, 'dist'),
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
        "@": path.resolve(root, "./src"),
        // Ensure components/ui can be resolved directly
        "components": path.resolve(root, "./src/components"),
        "@components": path.resolve(root, "./src/components"),
        // Use proper path for UI components
        "@ui": path.resolve(root, "./src/components/ui"),
        // Fix the dev-server alias to explicitly point to the mock-dev-server directory with full path
        "dev-server": mockDevServerPath,
      },
    },
    
    build: {
      rollupOptions: {
        output: {
          // Break down chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@/components/ui/button', '@/components/ui/card'] // Specify individual files instead of directory
          },
        },
      },
    },
    
    optimizeDeps: {
      // Properly exclude the dev-server from optimization
      exclude: ['dev-server'],
      // Add a fallback to handle potential missing modules
      esbuildOptions: {
        // Add a fallback for packages that might not be found
        plugins: [
          {
            name: 'mock-missing-modules',
            setup(build) {
              // Create empty module for missing dependencies
              build.onResolve({ filter: /^dev-server$/ }, args => {
                return { path: mockDevServerPath };
              });
            }
          }
        ]
      }
    },
  };
});
