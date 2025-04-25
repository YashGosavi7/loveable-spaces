
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

// Enhanced development mode logging
if (process.env.NODE_ENV !== 'production') {
  console.log('Running in development mode');
  console.log('React version:', React.version);
  console.log('Current environment:', process.env.NODE_ENV);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);

