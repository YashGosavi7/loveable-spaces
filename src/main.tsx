
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ImageOptimizationProvider } from './components/ImageOptimizationProvider'

// Prevent potential dev-server imports from causing issues
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
}

createRoot(document.getElementById("root")!).render(
  <ImageOptimizationProvider preloadStrategy="eager">
    <App />
  </ImageOptimizationProvider>
);
