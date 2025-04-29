
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectPage from './pages/ProjectPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  useEffect(() => {
    console.log('App component rendered');
    
    // Log routing information
    console.log('Current pathname:', window.location.pathname);
    
    // Detect possible CSS issues
    const styleSheets = document.styleSheets;
    console.log(`Loaded ${styleSheets.length} stylesheets`);
    
    // Check if critical elements are loaded
    setTimeout(() => {
      const header = document.querySelector('header');
      const main = document.querySelector('main');
      
      if (!header) console.warn('Header element not found in DOM');
      if (!main) console.warn('Main content element not found in DOM');
      
      console.log('DOM elements after initial render:', {
        header: !!header,
        main: !!main
      });
    }, 500);
  }, []);

  return (
    <>
      <div id="app-loading-indicator" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#f0f0f0',
        padding: '10px',
        textAlign: 'center',
        zIndex: 9999,
        display: 'none'
      }}>
        App is loading... If you see this message, rendering may be stuck.
      </div>
      
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
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('app-loading-indicator').style.display = 'block';
          setTimeout(() => {
            document.getElementById('app-loading-indicator').style.display = 'none';
          }, 2000);
        `
      }} />
    </>
  );
};

export default App;
