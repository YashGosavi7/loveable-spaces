
import { Home, Building, Utensils, Briefcase, MapPin, DollarSign } from "lucide-react";
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import servicesData from "../data/servicesData";

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
    </div>
  );
};

export default ServicesPage;
