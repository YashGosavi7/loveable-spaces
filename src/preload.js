
// This file must be imported at the beginning of your app to intercept require calls
console.log("Preloading dev-server mock");

// Completely override Node.js module resolution for dev-server paths
if (typeof require !== 'undefined' && require.resolve) {
  const originalResolve = require.resolve;
  require.resolve = function(request, options) {
    // Handle all variations of dev-server paths
    if (request === '/dev-server' || 
        request === '/dev-server/package.json' || 
        request === 'dev-server' || 
        request === 'dev-server/package.json' ||
        request.startsWith('/dev-server/') ||
        request.startsWith('dev-server/')) {
      
      // Return path to our local mock
      const path = require('path');
      return path.resolve(__dirname, '../dev-server/package.json');
    }
    return originalResolve(request, options);
  };
}

// Create global mock for any code that might try to import directly
if (typeof window !== 'undefined') {
  window.devServer = {
    version: "1.0.0",
    name: "mock-dev-server",
    isRunning: false,
    start: () => console.log("Mock dev server started"),
    stop: () => console.log("Mock dev server stopped"),
    getStatus: () => ({ status: "mocked" }),
    isAvailable: () => true,
    connect: () => Promise.resolve(true),
    disconnect: () => Promise.resolve(true)
  };
}
