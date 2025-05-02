
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root element and create a root for it
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

// Render the app without any dynamic imports or external dependencies
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
