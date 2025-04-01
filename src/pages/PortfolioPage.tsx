
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projectsData";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Residential");
  
  const categories = ["Residential", "Commercial", "Hospitality"];
  
  const filteredProjects = activeCategory === "Hospitality" 
    ? projectsData.filter(project => project.category === "Hospitality" || project.category === "Commercial")
    : projectsData.filter(project => project.category === activeCategory);
  
  return (
    <div className="min-h-screen pt-24">
      {/* Portfolio Header */}
      <section className="bg-lightGray py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl mb-6">Our Portfolio</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore our diverse collection of projects spanning residences, offices, retail spaces, and restaurants across India's major cities.
          </p>
        </div>
      </section>
      
      {/* Portfolio Categories */}
      <section className="bg-warmWhite py-8 px-4 border-b border-lightGray">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category 
                    ? "bg-roseGold text-darkBrown" 
                    : "bg-lightGray hover:bg-lightGray/70"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"> {/* Changed from 3 columns to 2 columns for larger images and increased gap */}
            {filteredProjects.map((project) => (
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
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
