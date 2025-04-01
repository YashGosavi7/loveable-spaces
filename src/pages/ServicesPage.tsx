
import { Home, Building, Utensils, Briefcase, MapPin, DollarSign } from "lucide-react";
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import servicesData from "../data/servicesData";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home": return Home;
      case "building": return Building;
      case "utensils": return Utensils;
      case "briefcase": return Briefcase;
      case "map-pin": return MapPin;
      case "circle-dollar-sign": return DollarSign;
      default: return Home;
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Services Hero */}
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"
        overlay={true}
        overlayOpacity="bg-black/40"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-4">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white">
            Comprehensive design solutions tailored to your unique needs
          </p>
        </div>
      </HeroSection>
      
      {/* Services Grid */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <SectionTitle 
            title="What We Offer" 
            subtitle="Balaji Design Studio provides a range of interior design services for both residential and commercial spaces" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <ServiceCard 
                key={service.id}
                icon={getIcon(service.icon)}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="section-padding bg-lightGray">
        <div className="container mx-auto">
          <SectionTitle 
            title="Our Design Process" 
            subtitle="How we bring your vision to life" 
            center 
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-roseGold/20"></div>
              
              {/* Process steps */}
              <div className="space-y-12 md:space-y-0">
                {/* Step 1 */}
                <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center relative">
                  <div className="md:text-right mb-8 md:mb-24">
                    <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-roseGold text-white flex items-center justify-center font-bold">
                        1
                      </div>
                    </div>
                    <div className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-roseGold text-white font-bold mb-4">
                      1
                    </div>
                    <h3 className="font-playfair text-2xl mb-3">Discovery</h3>
                    <p>
                      We begin with an in-depth consultation to understand your vision, requirements, lifestyle, and preferences
                    </p>
                  </div>
                  <div className="md:mt-24"></div>
                </div>
                
                {/* Step 2 */}
                <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center relative">
                  <div className="hidden md:block"></div>
                  <div className="md:mt-0 mb-8 md:mb-24">
                    <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-roseGold text-white flex items-center justify-center font-bold">
                        2
                      </div>
                    </div>
                    <div className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-roseGold text-white font-bold mb-4">
                      2
                    </div>
                    <h3 className="font-playfair text-2xl mb-3">Concept Development</h3>
                    <p>
                      We create detailed design concepts including space planning, color schemes, material selections, and 3D visualizations
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center relative">
                  <div className="md:text-right mb-8 md:mb-24">
                    <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-roseGold text-white flex items-center justify-center font-bold">
                        3
                      </div>
                    </div>
                    <div className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-roseGold text-white font-bold mb-4">
                      3
                    </div>
                    <h3 className="font-playfair text-2xl mb-3">Design Refinement</h3>
                    <p>
                      We collaborate with you to refine the design, incorporating your feedback until it perfectly aligns with your vision
                    </p>
                  </div>
                  <div className="md:mt-24"></div>
                </div>
                
                {/* Step 4 */}
                <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center relative">
                  <div className="hidden md:block"></div>
                  <div className="md:mt-0 mb-8 md:mb-24">
                    <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-roseGold text-white flex items-center justify-center font-bold">
                        4
                      </div>
                    </div>
                    <div className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-roseGold text-white font-bold mb-4">
                      4
                    </div>
                    <h3 className="font-playfair text-2xl mb-3">Implementation</h3>
                    <p>
                      Our team oversees the execution of the design, coordinating with contractors and vendors to ensure quality and accuracy
                    </p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center relative">
                  <div className="md:text-right">
                    <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-roseGold text-white flex items-center justify-center font-bold">
                        5
                      </div>
                    </div>
                    <div className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-roseGold text-white font-bold mb-4">
                      5
                    </div>
                    <h3 className="font-playfair text-2xl mb-3">Completion & Reveal</h3>
                    <p>
                      We finalize all details and present you with a beautifully designed space that exceeds your expectations
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-darkGray text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="font-playfair text-3xl md:text-4xl mb-6">Ready to Begin Your Design Journey?</h2>
          <p className="text-lg mb-8">
            Contact us today to schedule a consultation and discover how Balaji Design Studio can transform your space
          </p>
          <Link to="/contact" className="btn-primary">
            Let's Talk
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
