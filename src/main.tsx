
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Try to initialize the dev-server if needed
try {
  // This is a dynamic import so it only runs in development
  if (import.meta.env.DEV) {
    import('./utils/ensureDevServer.js').then(module => {
      if (typeof module.ensureDevServer === 'function') {
        module.ensureDevServer();
      }
    }).catch(err => {
      console.warn('Could not initialize dev server:', err);
    });
  }
} catch (e) {
  console.warn('Dev server initialization skipped:', e);
}

// Get the root element and create a root for it
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
