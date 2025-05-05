
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
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add an alias for dev-server to point to a mock
      "dev-server": path.resolve(__dirname, "./src/mock-dev-server"),
    },
  },
  optimizeDeps: {
    exclude: ['dev-server']
  },
}));
