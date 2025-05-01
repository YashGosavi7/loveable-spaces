
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const App: React.FC = () => {
  useEffect(() => {
    console.log('App component rendered');
    
    // Apply image performance optimizations
    optimizeImageDomains();
    
    // Log routing information
    console.log('Current pathname:', window.location.pathname);
    
    // Clean up image observers when unmounting
    return () => {
      cleanupImageIntersectionObservers();
    };
  }, []);

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
      
      {/* Add support for image lazy loading in older browsers */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Add support for image lazy loading in older browsers
          if (!('loading' in HTMLImageElement.prototype)) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
          }
        `
      }} />
    </>
  );
};

export default App;
