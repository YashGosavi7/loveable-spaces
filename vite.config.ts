
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from "rollup-plugin-visualizer";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';

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
      sourcemap: !isProduction,
      // Ultra-fast loading optimizations
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@/components/ui/button', '@/components/ui/card'],
            images: ['@/components/image/UltraFastPicture', '@/utils/ultraFastImageOptimization']
          },
          // Optimize chunk loading for images
          chunkFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'images') {
              return 'assets/images-[hash].js';
            }
            return 'assets/[name]-[hash].js';
          },
        },
        // Optimize bundle size
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
      // Enable build optimizations for faster loading
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
          pure_funcs: isProduction ? ['console.log', 'console.info'] : [],
        },
      },
      // Optimize chunk size for better caching
      chunkSizeWarningLimit: 1000,
    },
    // Ultra-fast image loading optimizations
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@/utils/ultraFastImageOptimization',
      ],
      exclude: ['@vite/client', '@vite/env'],
    },
    // Enable faster HMR for development
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
  };

  // Add visualizer plugin only in production for analysis
  if (isProduction) {
    config.plugins.push(
      visualizer({
        template: "treemap",
        open: false, // Don't auto-open to speed up build
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
  };
});
