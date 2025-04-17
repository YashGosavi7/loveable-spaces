import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projectsData from "../data/projectsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRightIcon } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

// Optimize expensive rendering with React.memo
const MemoizedProjectCard = React.memo(ProjectCard);

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Residential");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Removed 'All' from categories - keeping only specific categories
  const categories = ["Residential", "Commercial", "Hospitality"];

  useEffect(() => {
    // Filter projects based on category
    setFilteredProjects(projectsData.filter(project => 
      project.category === activeCategory
    ));
    
    // Scroll to top when category changes
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [activeCategory]);
  
  useEffect(() => {
    // Mark page as loaded with a slight delay to allow for smooth transitions
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen pt-24 md:pt-28">
      {/* Portfolio Header - Improved mobile spacing */}
      <motion.section 
        className="bg-warmWhite py-16 md:py-28 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-playfair mb-6">Our Portfolio</h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of projects spanning residences, offices, 
            retail spaces, and restaurants across India's major cities
          </p>
        </div>
      </motion.section>
      
      {/* Portfolio Categories - Fixed position but with proper spacing for mobile */}
      <section className="bg-warmWhite py-4 px-4 sticky top-[72px] z-10 border-b border-lightGray/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-6">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-5 py-3 min-w-[120px] text-base md:text-lg transition-all ${
                  activeCategory === category 
                    ? "bg-roseGold/90 text-white" 
                    : "bg-lightGray/30 hover:bg-lightGray/50 text-darkGray"
                }`}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Project - Only shows when in Residential category and it exists */}
      {activeCategory === "Residential" && (
        <section className="py-12 px-4 bg-warmWhite">
          <div className="container mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl mb-8 text-center">Featured Project</h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="group max-w-5xl mx-auto"
            >
              {projectsData.filter(p => p.id === "ravi-kale-celebrity-home").map(project => (
                <Link to={`/portfolio/${project.id}`} key={project.id} className="block">
                  <div className="relative overflow-hidden rounded-lg shadow-xl">
                    <AspectRatio ratio={16/9} className="bg-lightGray/30">
                      {!isLoaded && (
                        <Skeleton className="w-full h-full absolute inset-0" />
                      )}
                      <img 
                        src={project.images[0]} 
                        alt={project.title}
                        className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                          isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="eager" // Load the featured image immediately
                        width={1200}
                        height={675}
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                      <span className="text-roseGold/90 uppercase tracking-wider text-sm mb-3">Featured Project</span>
                      <h3 className="font-playfair text-white text-2xl md:text-3xl mb-2">{project.title}</h3>
                      <p className="text-white/90 mb-4 text-base md:text-lg">{project.category} | {project.location} | Designed by {project.designer}</p>
                      <span className="inline-flex items-center gap-2 text-roseGold/90 border border-roseGold/90 px-5 py-3 rounded text-base">
                        View Project <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 px-1 text-center">
                    <h3 className="font-playfair text-xl md:text-2xl">{project.title}</h3>
                    <p className="text-darkGray/80 text-base md:text-lg">{project.category} | {project.location} | Designed by {project.designer}</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Projects Grid - Mobile optimized spacing and sizing */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-warmWhite">
        <div className="container mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl mb-10">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"> 
            {filteredProjects
              .filter(p => p.id !== "ravi-kale-celebrity-home") // Exclude the featured project 
              .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.8) }} // Cap delay at 0.8s for better performance
              >
                <MemoizedProjectCard 
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  image={project.images[0]}
                  designer={project.designer}
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
