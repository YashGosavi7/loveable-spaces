
/**
 * Mock dev-server module to prevent errors
 * This file resolves any imports of the dev-server module
 * without actually needing the real module
 */
const mockDevServer = {
  version: "1.0.0",
  name: "mock-dev-server",
  isRunning: false,
  start: () => console.log("Mock dev server started"),
  stop: () => console.log("Mock dev server stopped"),
  // Add any other methods that might be called on the dev-server
  getStatus: () => ({ status: "mocked" }),
  isAvailable: () => true,
  connect: () => Promise.resolve(true),
  disconnect: () => Promise.resolve(true),
};

// Handle both default and named exports
export default mockDevServer;
export const ensureDevServer = () => Promise.resolve(mockDevServer);
export const getDevServer = () => mockDevServer;
