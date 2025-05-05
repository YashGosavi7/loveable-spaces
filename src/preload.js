
// This file can be imported at the beginning of your app to set up the mock
// You don't need to actually import it if the other fixes work
console.log("Preloading dev-server mock");

// Mock the require.resolve function to handle dev-server resolution
const originalResolve = require.resolve;
require.resolve = function(request, options) {
  if (request === '/dev-server' || request === '/dev-server/package.json' || 
      request === 'dev-server' || request === 'dev-server/package.json') {
    return require('path').resolve(__dirname, '../dev-server/package.json');
  }
  return originalResolve(request, options);
};
