
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { initImagePreloading } from './utils/imagePreloader';

// Initialize image preloading system
initImagePreloading();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for advanced image caching
serviceWorker.register();
