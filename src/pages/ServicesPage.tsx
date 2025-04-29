
import React from 'react';
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import servicesData from '../data/servicesData';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Services Hero */}
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        overlay={true}
        overlayOpacity="bg-black/50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-white font-semibold mb-4">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Design solutions tailored to your needs
          </p>
        </div>
      </HeroSection>
      
      {/* Services Overview */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <SectionTitle 
            title="What We Offer" 
            subtitle="Comprehensive design services for every space" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicesData.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-block bg-roseGold/10 p-4 rounded-full mb-4">
                  {service.icon}
                </div>
                <h3 className="font-playfair text-xl mb-3">{service.title}</h3>
                <p className="mb-6">{service.description}</p>
                <Link 
                  to="/contact" 
                  className="text-roseGold hover:text-roseGold/80 font-medium"
                >
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Design Process */}
      <section className="section-padding bg-lightGray">
        <div className="container mx-auto">
          <SectionTitle 
            title="Our Design Process" 
            subtitle="How we bring your vision to life" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-roseGold/90 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-semibold">
                1
              </div>
              <h3 className="font-playfair text-xl mb-2">Consultation</h3>
              <p className="text-darkGray/80">
                We begin by understanding your needs, style preferences, and budget
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-roseGold/90 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-semibold">
                2
              </div>
              <h3 className="font-playfair text-xl mb-2">Concept Design</h3>
              <p className="text-darkGray/80">
                Our team develops initial design concepts and visual directions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-roseGold/90 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-semibold">
                3
              </div>
              <h3 className="font-playfair text-xl mb-2">Implementation</h3>
              <p className="text-darkGray/80">
                We manage the project execution with meticulous attention to detail
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-roseGold/90 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-semibold">
                4
              </div>
              <h3 className="font-playfair text-xl mb-2">Completion</h3>
              <p className="text-darkGray/80">
                Final styling and handover of your beautifully transformed space
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-darkGray text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="font-playfair text-3xl md:text-4xl mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg mb-8">
            Get in touch with us to discuss your project needs and discover how we can help
          </p>
          <Link to="/contact" className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
