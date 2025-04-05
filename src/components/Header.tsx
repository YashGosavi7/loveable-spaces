
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-lightGray/95 shadow-md py-2" 
          : "bg-transparent py-2"
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center">
        {/* Resized logo (2-3x) positioned at extreme top-left */}
        <Link to="/" className="flex items-center justify-start -ml-2">
          <img 
            src="/lovable-uploads/53764224-0c8e-4dd4-9e9e-908c69e2d74a.png" 
            alt="Balaji Design Studio Logo" 
            className="h-20 sm:h-24 md:h-28 object-contain" 
          />
        </Link>
        
        {/* Desktop Navigation - Enhanced visibility, aligned to top-right */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/" className={`nav-link text-xl font-bold ${isActive("/") ? "nav-link-active" : ""}`}>
            Home
          </Link>
          <Link to="/portfolio" className={`nav-link text-xl font-bold ${isActive("/portfolio") ? "nav-link-active" : ""}`}>
            Portfolio
          </Link>
          <Link to="/about" className={`nav-link text-xl font-bold ${isActive("/about") ? "nav-link-active" : ""}`}>
            About
          </Link>
          <Link to="/services" className={`nav-link text-xl font-bold ${isActive("/services") ? "nav-link-active" : ""}`}>
            Services
          </Link>
          <Link to="/contact" className={`nav-link text-xl font-bold ${isActive("/contact") ? "nav-link-active" : ""}`}>
            Contact
          </Link>
        </nav>
        
        {/* Mobile menu button with improved accessibility */}
        <button 
          className="md:hidden flex items-center justify-center p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={32} className="text-darkGray" />
          ) : (
            <Menu size={32} className="text-darkGray" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation with smoother transition */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-lightGray/95 absolute top-full left-0 w-full shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-5 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`nav-link-mobile text-xl font-bold ${isActive("/") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link-mobile text-xl font-bold ${isActive("/portfolio") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className={`nav-link-mobile text-xl font-bold ${isActive("/about") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`nav-link-mobile text-xl font-bold ${isActive("/services") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link-mobile text-xl font-bold ${isActive("/contact") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
