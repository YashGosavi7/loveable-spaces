
/**
 * Mock dev-server module to prevent errors
 * This file provides comprehensive mocking for any imports of the dev-server module
 */
const mockDevServer = {
  version: "1.0.0",
  name: "mock-dev-server",
  isRunning: false,
  start: () => console.log("Mock dev server started"),
  stop: () => console.log("Mock dev server stopped"),
  getStatus: () => ({ status: "mocked" }),
  isAvailable: () => true,
  connect: () => Promise.resolve(true),
  disconnect: () => Promise.resolve(true),
  // Add every possible method that might be called
  ping: () => Promise.resolve({ status: "ok" }),
  restart: () => Promise.resolve(true),
  getConfig: () => ({ enabled: false, port: 3000 }),
  getLogs: () => [],
  on: () => {},
  off: () => {},
  emit: () => {},
};

// Export all variations to handle any import style
export default mockDevServer;
export const ensureDevServer = () => Promise.resolve(mockDevServer);
export const getDevServer = () => mockDevServer;
export const isDevServerRunning = () => false;
export const startDevServer = () => Promise.resolve(mockDevServer);
export const stopDevServer = () => Promise.resolve(true);

// Create a module exports object for CommonJS imports
if (typeof module !== 'undefined') {
  module.exports = {
    ...mockDevServer,
    default: mockDevServer,
    ensureDevServer: () => Promise.resolve(mockDevServer),
    getDevServer: () => mockDevServer,
    isDevServerRunning: () => false,
    startDevServer: () => Promise.resolve(mockDevServer),
    stopDevServer: () => Promise.resolve(true),
  };
}
