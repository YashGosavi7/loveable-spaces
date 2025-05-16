
// This is a mock file to prevent errors related to missing dev-server
console.log('Mock dev-server loaded successfully');

export default {
  // Add fallback methods and properties here if needed by your application
  init: () => console.log('Mock server initialized'),
  connect: () => console.log('Mock connection established'),
  disconnect: () => console.log('Mock disconnected'),
  isConnected: false,
  status: 'mocked'
};
