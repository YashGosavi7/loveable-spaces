
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import servicesData from "@/data/servicesData";
import projectsData from "@/data/projectsData";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/lovable-uploads/ea548018-bf11-415b-b890-ffe196e345c5.png')",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Hero Content - positioned towards bottom */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Balaji Design Studio
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Crafting Timeless Interiors Since 2012
              </p>
              <Link 
                to="/portfolio" 
                className="inline-block bg-roseGold/90 text-white px-5 py-2.5 rounded-md hover:bg-roseGold transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-roseGold/50"
              >
                Explore Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <SectionTitle 
            title="Our Services" 
            subtitle="Creating beautiful spaces that reflect your personality"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard 
                key={index} 
                icon={service.icon as any}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-lightGray">
        <div className="container mx-auto">
          <SectionTitle 
            title="Featured Projects" 
            subtitle="A showcase of our finest interior design work"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.slice(0, 6).map((project, index) => (
              <ProjectCard 
                key={project.id} 
                id={project.id}
                title={project.title}
                category={project.category}
                location={project.location}
                image={project.images[0]}
                designer={project.designer}
                tagline={project.tagline}
                index={index}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
