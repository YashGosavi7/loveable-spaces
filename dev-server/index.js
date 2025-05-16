
// This is a fallback file to prevent errors related to missing dev-server
console.log('Fallback dev-server loaded');

module.exports = {
  // Add fallback methods and properties here if needed by your application
  init: () => console.log('Fallback server initialized'),
  connect: () => console.log('Fallback connection established'),
  disconnect: () => console.log('Fallback disconnected'),
  isConnected: false,
  status: 'fallback'
};
