
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import preload module to fix dev-server resolution before anything else runs
import './preload';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
