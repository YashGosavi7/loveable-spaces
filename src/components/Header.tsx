
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
          ? "bg-lightGray shadow-md py-2" 
          : "bg-transparent py-3 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-start">
          <img 
            src="/lovable-uploads/53764224-0c8e-4dd4-9e9e-908c69e2d74a.png" 
            alt="Balaji Design Studio Logo" 
            className="h-28 sm:h-32 md:h-36 lg:h-40 object-contain" 
            priority={true}
          />
        </Link>
        
        {/* Desktop Navigation - Improved Typography */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link text-base lg:text-lg ${isActive("/") ? "nav-link-active" : ""}`}>
            Home
          </Link>
          <Link to="/portfolio" className={`nav-link text-base lg:text-lg ${isActive("/portfolio") ? "nav-link-active" : ""}`}>
            Portfolio
          </Link>
          <Link to="/about" className={`nav-link text-base lg:text-lg ${isActive("/about") ? "nav-link-active" : ""}`}>
            About
          </Link>
          <Link to="/services" className={`nav-link text-base lg:text-lg ${isActive("/services") ? "nav-link-active" : ""}`}>
            Services
          </Link>
          <Link to="/contact" className={`nav-link text-base lg:text-lg ${isActive("/contact") ? "nav-link-active" : ""}`}>
            Contact
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-roseGold" />
          ) : (
            <Menu size={24} className="text-roseGold" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation - Enhanced Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-darkGray/95 z-50">
          <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
            <Link 
              to="/" 
              className={`nav-link text-xl mb-8 text-white hover:text-roseGold ${isActive("/") ? "text-roseGold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link text-xl mb-8 text-white hover:text-roseGold ${isActive("/portfolio") ? "text-roseGold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className={`nav-link text-xl mb-8 text-white hover:text-roseGold ${isActive("/about") ? "text-roseGold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`nav-link text-xl mb-8 text-white hover:text-roseGold ${isActive("/services") ? "text-roseGold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link text-xl mb-8 text-white hover:text-roseGold ${isActive("/contact") ? "text-roseGold" : ""}`}
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
