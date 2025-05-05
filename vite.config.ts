
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
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'mock-dev-server',
      resolveId(id: string) {
        // Intercept any imports that try to access the dev-server path
        if (id.includes('dev-server')) {
          // Return a virtual module id that we'll handle in load
          return 'virtual:dev-server';
        }
        return null;
      },
      load(id: string) {
        // Return an empty module for the virtual module
        if (id === 'virtual:dev-server') {
          return 'export default {}';
        }
        return null;
      },
    },
    {
      name: 'html-transform',
      transformIndexHtml(html: string) {
        // Add preconnect and dns-prefetch hints - without using window
        return html.replace(
          /<head>/,
          `<head>
    <!-- DNS prefetch for fast lookups -->
    <link rel="dns-prefetch" href="//self" />
    <link rel="preconnect" href="//self" crossorigin />
    
    <!-- Preload critical fonts -->
    <link rel="preload" href="/fonts/your-main-font.woff2" as="font" type="font/woff2" crossorigin />
    
    <!-- Cache control hints -->
    <meta http-equiv="Cache-Control" content="max-age=86400" />
`
        );
      },
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Ensure components/ui can be resolved directly
      "components": path.resolve(__dirname, "./src/components"),
      // Add an alias for dev-server to point to a mock
      "dev-server": path.resolve(__dirname, "./src/mock-dev-server"),
    },
  },
  optimizeDeps: {
    exclude: ['dev-server']
  },
  build: {
    // Configure build options for better image optimization
    assetsInlineLimit: 0, // Don't inline assets
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Break down chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['/components/ui/'],
        },
      },
    },
  },
}));
