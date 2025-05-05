
// Mock dev-server module
console.log("Mock dev-server loaded");

module.exports = {
  version: "1.0.0",
  name: "dev-server-mock",
  isRunning: false,
  start: () => console.log("Mock dev server started"),
  stop: () => console.log("Mock dev server stopped"),
  getStatus: () => ({ status: "mocked" }),
  isAvailable: () => true,
  connect: () => Promise.resolve(true),
  disconnect: () => Promise.resolve(true),
  ping: () => Promise.resolve({ status: "ok" }),
  restart: () => Promise.resolve(true),
  getConfig: () => ({ enabled: false, port: 3000 }),
  getLogs: () => []
};
