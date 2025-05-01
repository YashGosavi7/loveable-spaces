
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectPage from './pages/ProjectPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import { optimizeImageDomains } from './utils/imageUtils';
import { cleanupImageIntersectionObservers } from './hooks/useImageIntersection';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from 'sonner';
import { clearImagePreloadCache } from './hooks/useImagePreload';

const App: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('App component initialized');
    
    // Apply image performance optimizations once
    optimizeImageDomains();
    
    // Return cleanup function
    return () => {
      console.log('App component unmounting, cleaning up resources');
      cleanupImageIntersectionObservers();
      clearImagePreloadCache();
    };
  }, []);
  
  // Clean up observers when route changes to prevent memory leaks
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    cleanupImageIntersectionObservers();
    clearImagePreloadCache();
  }, [location.pathname]);

  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:projectId" element={<ProjectPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
      
      {/* Support for image lazy loading in older browsers - simplified */}
      <script dangerouslySetInnerHTML={{
        __html: `
          if (!('loading' in HTMLImageElement.prototype)) {
            document.write('<script src="https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js" async><\\/script>');
          }
        `
      }} />
    </>
  );
};

export default App;
