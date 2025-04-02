
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projectsData";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Residential");
  const [filteredProjects, setFilteredProjects] = useState(projectsData.filter(project => project.category === "Residential"));
  
  const categories = ["Residential", "Commercial", "Hospitality"];

  useEffect(() => {
    // Filter projects based on category
    if (activeCategory === "Hospitality") {
      setFilteredProjects(projectsData.filter(project => 
        project.category === "Hospitality" || project.category === "Commercial"
      ));
    } else {
      setFilteredProjects(projectsData.filter(project => 
        project.category === activeCategory
      ));
    }
    
    // Scroll to top when category changes
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [activeCategory]);
  
  return (
    <div className="min-h-screen pt-24">
      {/* Portfolio Header */}
      <section className="bg-warmWhite py-32 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-8">Our Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of projects spanning residences, offices, retail spaces, and restaurants across India's major cities
          </p>
        </div>
      </section>
      
      {/* Portfolio Categories */}
      <section className="bg-warmWhite py-8 px-4 sticky top-20 z-10 border-b border-lightGray/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map(category => (
              <button
                key={category}
                className={`px-8 py-3 rounded-lg transition-all text-lg ${
                  activeCategory === category 
                    ? "bg-roseGold text-white shadow-lg" 
                    : "bg-lightGray/30 hover:bg-lightGray/50 text-darkGray"
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
      <section className="py-16 md:py-24 px-4 sm:px-8 bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16"> 
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  image={project.images[0]}
                />
              </motion.div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <p className="text-2xl">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
