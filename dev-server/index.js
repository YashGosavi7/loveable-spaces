
// Mock dev-server index file
console.log("Mock dev-server loaded");

module.exports = {
  version: "1.0.0",
  name: "dev-server-mock",
  isRunning: false,
  start: () => console.log("Mock dev server started"),
  stop: () => console.log("Mock dev server stopped")
};
