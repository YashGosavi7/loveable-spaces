
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
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/53764224-0c8e-4dd4-9e9e-908c69e2d74a.png" 
            alt="Balaji Design Studio Logo" 
            className="h-24 md:h-28" 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`header-link ${isActive("/") ? "header-link-active" : ""}`}>
            Home
          </Link>
          <Link to="/portfolio" className={`header-link ${isActive("/portfolio") ? "header-link-active" : ""}`}>
            Portfolio
          </Link>
          <Link to="/about" className={`header-link ${isActive("/about") ? "header-link-active" : ""}`}>
            About
          </Link>
          <Link to="/services" className={`header-link ${isActive("/services") ? "header-link-active" : ""}`}>
            Services
          </Link>
          <Link to="/contact" className={`header-link ${isActive("/contact") ? "header-link-active" : ""}`}>
            Contact
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-darkGray"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-lightGray absolute top-full left-0 w-full shadow-md">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`header-link ${isActive("/") ? "header-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className={`header-link ${isActive("/portfolio") ? "header-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className={`header-link ${isActive("/about") ? "header-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`header-link ${isActive("/services") ? "header-link-active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`header-link ${isActive("/contact") ? "header-link-active" : ""}`}
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
