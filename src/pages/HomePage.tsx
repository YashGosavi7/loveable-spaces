
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projectsData";

const HomePage = () => {
  const featuredProjects = projectsData.filter(project => project.isFeatured);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        showCityScroll={true}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-4">
            Balaji Design Studio
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10">
            Creative Creation by Creative People
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/portfolio" className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
              Our Projects
            </Link>
          </div>
        </div>
      </HeroSection>
      
      {/* Featured Projects */}
      <section className="section-padding bg-lightGray">
        <div className="container mx-auto">
          <SectionTitle 
            title="Featured Projects" 
            subtitle="A glimpse of our recent work across India" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                location={project.location}
                image={project.images[0]}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/portfolio" className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
              Our Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <SectionTitle 
            title="Our Services" 
            subtitle="Comprehensive design solutions tailored to your needs" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="inline-block bg-roseGold/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-roseGold">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-2">Residential Design</h3>
              <p>Timeless homes, built around you Personalized, elegant, and functional</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-block bg-roseGold/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-roseGold">
                  <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                  <path d="M9 22v-4h6v4"></path>
                  <path d="M8 6h.01"></path>
                  <path d="M16 6h.01"></path>
                  <path d="M12 6h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 10h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 10h.01"></path>
                  <path d="M8 14h.01"></path>
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-2">Commercial Interiors</h3>
              <p>Offices that redefine work Smart, modern, and designed for success</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-block bg-roseGold/10 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-roseGold">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                  <path d="M7 2v20"></path>
                  <path d="M21 15V2"></path>
                  <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                  <path d="M18 2v10"></path>
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-2">Hospitality Design</h3>
              <p>Ambience meets appetite Designs that make every meal an experience</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/portfolio" className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
              Our Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-darkGray text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="font-playfair text-3xl md:text-4xl mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg mb-8">
            Let's create something beautiful together that reflects your unique style and needs
          </p>
          <Link to="/portfolio" className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
            Our Projects
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
