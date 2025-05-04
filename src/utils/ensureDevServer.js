
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
  stop: () => console.log("Mock dev server stopped")
};

export default mockDevServer;
