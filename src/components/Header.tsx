
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

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
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/53764224-0c8e-4dd4-9e9e-908c69e2d74a.png" 
            alt="Balaji Design Studio Logo" 
            className="h-40 md:h-44"
          />
        </Link>
        
        {/* Desktop Navigation - Enhanced with better contrast and visibility */}
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
        
        {/* Updated Mobile menu button */}
        <button 
          className="md:hidden flex items-center gap-2 px-3 py-2 border border-darkGray/20 rounded transition-colors hover:bg-lightGray/50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <>
              <X size={20} />
              <span className="text-sm font-medium">Close</span>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <div className="w-5 h-0.5 bg-darkGray"></div>
                <div className="w-3 h-0.5 bg-darkGray ml-2"></div>
                <div className="w-5 h-0.5 bg-darkGray"></div>
              </div>
              <span className="text-sm font-medium">Menu</span>
            </>
          )}
        </button>
      </div>
      
      {/* Mobile Navigation - Enhanced with better contrast and visibility */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-lightGray absolute top-full left-0 w-full shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link ${isActive("/portfolio") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive("/about") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`nav-link ${isActive("/services") ? "nav-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""}`}
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
