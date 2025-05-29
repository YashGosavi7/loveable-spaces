
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { initImagePreloading } from './utils/imagePreloader';

// Initialize image preloading system
initImagePreloading();

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for advanced image caching
serviceWorker.register();
