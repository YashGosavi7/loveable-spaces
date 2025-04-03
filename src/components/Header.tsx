
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-lightGray shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Optimized logo sizing for better visibility across devices */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/53764224-0c8e-4dd4-9e9e-908c69e2d74a.png" 
            alt="Balaji Design Studio Logo" 
            className="h-14 md:h-20 lg:h-24 object-contain" 
          />
        </Link>
        
        {/* Desktop Navigation with improved contrast and visibility */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}>
            Home
          </Link>
          <Link to="/portfolio" className={`nav-link ${isActive("/portfolio") ? "nav-link-active" : ""}`}>
            Portfolio
          </Link>
          <Link to="/about" className={`nav-link ${isActive("/about") ? "nav-link-active" : ""}`}>
            About
          </Link>
          <Link to="/services" className={`nav-link ${isActive("/services") ? "nav-link-active" : ""}`}>
            Services
          </Link>
          <Link to="/contact" className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""}`}>
            Contact
          </Link>
        </nav>
        
        {/* Enhanced mobile menu button with better positioning */}
        <button 
          className="md:hidden flex items-center justify-center p-2 rounded-md transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={26} className="text-darkGray" />
          ) : (
            <Menu size={26} className="text-darkGray" />
          )}
        </button>
      </div>
      
      {/* Improved Mobile Navigation with better spacing and readability */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-lightGray absolute top-full left-0 w-full shadow-md animate-fade-in">
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-7">
            <Link 
              to="/" 
              className={`nav-link text-xl font-medium ${isActive("/") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link text-xl font-medium ${isActive("/portfolio") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className={`nav-link text-xl font-medium ${isActive("/about") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`nav-link text-xl font-medium ${isActive("/services") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link text-xl font-medium ${isActive("/contact") ? "nav-link-active" : ""}`}
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
