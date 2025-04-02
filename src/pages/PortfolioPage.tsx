
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projectsData from "../data/projectsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRightIcon } from "lucide-react";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const categories = ["All", "Residential", "Commercial", "Hospitality"];

  useEffect(() => {
    // Filter projects based on category
    if (activeCategory === "All") {
      setFilteredProjects(projectsData);
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
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="min-h-screen pt-24">
      {/* Portfolio Header */}
      <motion.section 
        className="bg-warmWhite py-20 md:py-32 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-6">Our Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of projects spanning residences, offices, 
            retail spaces, and restaurants across India's major cities
          </p>
        </div>
      </motion.section>
      
      {/* Portfolio Categories */}
      <section className="bg-warmWhite py-6 px-4 sticky top-20 z-10 border-b border-lightGray/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-8 py-3 min-w-[120px] text-lg transition-all ${
                  activeCategory === category 
                    ? "bg-roseGold text-white" 
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
      
      {/* Projects Grid */}
      <section className="py-16 md:py-20 px-4 sm:px-8 bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"> 
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/portfolio/${project.id}`} className="block">
                  <div className="relative overflow-hidden">
                    <AspectRatio ratio={4/3} className="bg-lightGray/30">
                      <img 
                        src={project.images[0]}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                      <h3 className="font-playfair text-white text-2xl mb-2">{project.title}</h3>
                      <p className="text-white/80 mb-4">{project.category} | {project.location}</p>
                      <span className="inline-flex items-center gap-2 text-roseGold">
                        View Project <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-playfair text-xl">{project.title}</h3>
                    <p className="text-darkGray/70">{project.category} | {project.location}</p>
                  </div>
                </Link>
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
