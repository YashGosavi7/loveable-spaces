
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { initImagePreloading } from './utils/imagePreloader';
import { TEAM_MEMBER_IMAGES } from './utils/imageUtils';

// Initialize image preloading system with enhanced performance
initImagePreloading();

// Preload team member images immediately for faster loading
if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage({
    type: 'PRELOAD_IMAGES',
    urls: TEAM_MEMBER_IMAGES
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for advanced image caching with immediate activation
serviceWorker.register({
  onUpdate: (registration) => {
    // When service worker updates, activate it immediately
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  },
  onSuccess: (registration) => {
    console.log('Service worker registered successfully');
    
    // When service worker activates successfully, preload critical images
    if (registration) {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'PRELOAD_IMAGES',
          urls: TEAM_MEMBER_IMAGES
        });
      }
    }
  }
});
