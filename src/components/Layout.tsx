
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Show loading state when route changes
    setIsLoading(true);
    
    // Scroll back to top
    window.scrollTo(0, 0);
    
    // Hide loading after a short delay or when page content loads
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1">
          <div className="h-full bg-roseGold animate-progress-indeterminate" />
        </div>
      )}
      <Header isScrolled={isScrolled} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

