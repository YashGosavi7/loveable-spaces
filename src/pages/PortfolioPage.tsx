
import React, { useState } from 'react';
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import CategoryFilter from '../components/portfolio/CategoryFilter';
import ProjectsGrid from '../components/portfolio/ProjectsGrid';
import projectsData from '../data/projectsData';

const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);
  
  return (
    <div className="min-h-screen">
      {/* Portfolio Hero Section */}
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        overlay={true}
        overlayOpacity="bg-black/50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-white font-semibold mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Explore our diverse collection of design projects
          </p>
        </div>
      </HeroSection>
      
      {/* Portfolio Grid Section */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <SectionTitle 
            title="Our Projects" 
            subtitle="Browse our design work by category" 
            center 
          />
          
          <CategoryFilter 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          
          <ProjectsGrid projects={filteredProjects} />
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
