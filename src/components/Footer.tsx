import React from "react";
import { Separator } from "./ui/separator"; // Assuming Separator is used

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkGray text-lightGray/70 py-12 section-padding-x">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="font-playfair text-lg text-white mb-3">Balaji Design Studio</h3>
            <p className="text-sm mb-3 font-lato">
              Crafting timeless interiors since 2012. With over 600 projects across Tier 1 cities, we bring visions to life.
            </p>
            <p className="text-xs font-lato">
              Preview all project images instantly – <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank" rel="noopener noreferrer" className="text-roseGold hover:text-roseGold/80 transition-colors">Contact Dalpat Suthar on WhatsApp!</a>
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-playfair text-lg text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 font-lato text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-playfair text-lg text-white mb-3">Get in Touch</h3>
            <address className="not-italic font-lato text-sm space-y-2">
              <p>Pune, Maharashtra, India</p>
              <p>Email: <a href="mailto:info@balajidesignstudio.com" className="hover:text-white transition-colors">info@balajidesignstudio.com</a></p>
              <p>Phone: <a href="tel:+91XXXXXXXXXX" className="hover:text-white transition-colors">+91 XXXXX XXXXX</a></p>
            </address>
          </div>
        </div>
        
        <Separator className="bg-lightGray/20 my-8" />

        <div className="text-center text-xs font-lato">
          <p>&copy; {currentYear} Balaji Design Studio. All Rights Reserved.</p>
          <p className="mt-1">Designed with passion in Pune.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
