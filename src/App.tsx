
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectPage from './pages/ProjectPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

// Resource cleanup component
const RouteChangeHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Clean up resources on route changes
    return () => {
      // Clear any potential memory leaks
      const allImages = document.querySelectorAll('img[loading="lazy"]');
      allImages.forEach(img => {
        if (img.src) {
          const originalSrc = img.src;
          img.src = '';
          setTimeout(() => {
            if (document.contains(img)) img.src = originalSrc;
          }, 10);
        }
      });
    };
  }, [location.pathname]);
  
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <RouteChangeHandler />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:projectId" element={<ProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
