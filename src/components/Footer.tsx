
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-darkGray text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-xl mb-4">Balaji Design Studio</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Founded in 2012, Balaji Design Studio has completed over 600 projects across Pune, Mumbai, Latur, Solapur, Satara, Solpaur, Belgaum, Hyderabad, and Bangalore, blending cultural heritage with modern elegance
            </p>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-roseGold transition-colors">Home</Link></li>
              <li><Link to="/portfolio" className="hover:text-roseGold transition-colors">Portfolio</Link></li>
              <li><Link to="/about" className="hover:text-roseGold transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-roseGold transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-roseGold transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+91 9762000000</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>balajidesignstudio@hotmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/balaji_design_studio_/" target="_blank" rel="noopener noreferrer" className="hover:text-roseGold transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-sm opacity-60">
            &copy; {new Date().getFullYear()} Balaji Design Studio All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
