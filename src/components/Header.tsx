
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const headerClass = isScrolled 
    ? "bg-lightGray shadow-md" 
    : "bg-transparent";

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-playfair text-xl md:text-2xl font-semibold text-darkGray">
            Balaji Design Studio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link ${isActive('/portfolio') ? 'nav-link-active' : ''}`}
            >
              Portfolio
            </Link>
            <Link 
              to="/services" 
              className={`nav-link ${isActive('/services') ? 'nav-link-active' : ''}`}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`block w-6 h-0.5 bg-darkGray transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-darkGray mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-darkGray mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="py-4 space-y-3 bg-lightGray rounded-lg mt-2 px-4">
            <Link 
              to="/" 
              className={`block py-2 px-3 rounded text-darkGray hover:bg-roseGold/10 transition-colors ${isActive('/') ? 'bg-roseGold/20 font-medium' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/portfolio" 
              className={`block py-2 px-3 rounded text-darkGray hover:bg-roseGold/10 transition-colors ${isActive('/portfolio') ? 'bg-roseGold/20 font-medium' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/services" 
              className={`block py-2 px-3 rounded text-darkGray hover:bg-roseGold/10 transition-colors ${isActive('/services') ? 'bg-roseGold/20 font-medium' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 px-3 rounded text-darkGray hover:bg-roseGold/10 transition-colors ${isActive('/about') ? 'bg-roseGold/20 font-medium' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block py-2 px-3 rounded text-darkGray hover:bg-roseGold/10 transition-colors ${isActive('/contact') ? 'bg-roseGold/20 font-medium' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
