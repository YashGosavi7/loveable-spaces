
/**
 * This file serves as a placeholder module for the 'dev-server' alias.
 * It's used to satisfy Vite's dependency resolution during build time.
 * 
 * The actual implementation is resolved from src/mock-dev-server via the alias
 * configuration in vite.config.ts.
 */

// Export a placeholder object that won't cause issues if imported
const placeholderModule = {
  name: 'dev-server-placeholder',
  version: '1.0.0',
  isPlaceholder: true
};

export default placeholderModule;
