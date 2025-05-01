
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to ensure the dev-server directory exists with a package.json
function ensureDevServer() {
  const devServerPath = path.resolve('/dev-server');
  
  // Check if the directory exists, create if it doesn't
  if (!fs.existsSync(devServerPath)) {
    console.log('Creating /dev-server directory...');
    try {
      fs.mkdirSync(devServerPath, { recursive: true });
    } catch (err) {
      console.warn('Warning: Could not create /dev-server directory. This is normal in some environments.');
      // Don't throw error - this may be a sandboxed environment where we can't create this dir
      return false;
    }
  }
  
  // Check if package.json exists, create if it doesn't
  const packageJsonPath = path.join(devServerPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('Creating basic package.json in /dev-server...');
    try {
      const packageJson = {
        name: "dev-server",
        version: "1.0.0",
        description: "Dev server package.json",
        main: "index.js",
        scripts: {
          "start": "echo 'Dev server placeholder'"
        },
        dependencies: {}
      };
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    } catch (err) {
      console.warn('Warning: Could not create package.json. This is normal in some environments.');
      // Don't throw error
      return false;
    }
  }
  
  return true;
}

// Execute when the script is run directly
if (require.main === module) {
  ensureDevServer();
}

module.exports = { ensureDevServer };
