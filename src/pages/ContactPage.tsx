
import React from 'react';
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import WhatsAppCTA from '../components/portfolio/WhatsAppCTA';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Contact Hero */}
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        overlay={true}
        overlayOpacity="bg-black/50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-white font-semibold mb-4">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Let's create something beautiful together
          </p>
        </div>
      </HeroSection>
      
      {/* Contact Information */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionTitle 
                title="Get in Touch" 
                subtitle="We're ready to bring your vision to life" 
              />
              
              <div className="space-y-6 mt-8">
                <div className="flex items-start">
                  <div className="bg-roseGold/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-roseGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl mb-1">Phone</h3>
                    <p className="text-darkGray/80">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-roseGold/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-roseGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl mb-1">Email</h3>
                    <p className="text-darkGray/80">contact@balajidesignstudio.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-roseGold/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-roseGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl mb-1">Studio Address</h3>
                    <p className="text-darkGray/80">123 Design Avenue, Baner</p>
                    <p className="text-darkGray/80">Pune, Maharashtra 411045</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-playfair text-xl mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-roseGold/10 p-3 rounded-full text-roseGold hover:bg-roseGold/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                  <a href="#" className="bg-roseGold/10 p-3 rounded-full text-roseGold hover:bg-roseGold/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-playfair text-2xl mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-darkGray/80 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-roseGold focus:border-roseGold"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-darkGray/80 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-roseGold focus:border-roseGold"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-darkGray/80 mb-2">Phone</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-roseGold focus:border-roseGold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-darkGray/80 mb-2">Service Interest</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-roseGold focus:border-roseGold">
                    <option>Residential Interior Design</option>
                    <option>Commercial Interior Design</option>
                    <option>Hospitality Design</option>
                    <option>Consultation</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-darkGray/80 mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-roseGold focus:border-roseGold"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <WhatsAppCTA text="Connect with Dalpat on WhatsApp" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
