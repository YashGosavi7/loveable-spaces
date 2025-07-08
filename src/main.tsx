
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import * as serviceWorker from './serviceWorker';
import { initImagePreloading } from './utils/imagePreloader';

// Initialize image preloading system
initImagePreloading();

// Add meta tags for performance
const addMetaTags = () => {
  const meta = document.createElement('meta');
  meta.name = 'description';
  meta.content = 'Discover Balaji Design Studio – crafting timeless interiors since 2012. Over 600 projects across Pune, Mumbai, Hyderabad, and beyond.';
  document.head.appendChild(meta);

  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
  document.head.appendChild(viewport);

  // Preconnect to optimization domains
  const preconnectGoogle = document.createElement('link');
  preconnectGoogle.rel = 'preconnect';
  preconnectGoogle.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnectGoogle);

  const preconnectGstatic = document.createElement('link');
  preconnectGstatic.rel = 'preconnect';
  preconnectGstatic.href = 'https://fonts.gstatic.com';
  preconnectGstatic.crossOrigin = 'anonymous';
  document.head.appendChild(preconnectGstatic);
};

addMetaTags();

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// Register service worker for advanced image caching
serviceWorker.register();
