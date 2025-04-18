
import React, { useState, useEffect, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projectsData from "../data/projectsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRightIcon } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

// Optimize expensive rendering with React.memo
const MemoizedProjectCard = React.memo(ProjectCard);

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Residential");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Categories without 'All' to reduce initial load
  const categories = ["Residential", "Commercial", "Hospitality"];
  
  // Get height for featured project to prevent layout shift
  const getFeaturedAspectRatio = () => {
    // Default to 16/9 for typical featured image
    return 16/9;
  };

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

  // Get featured project for the active category with memoization
  const getFeaturedProject = useCallback(() => {
    const categoryFeaturedProjects = projectsData.filter(p => 
      p.category === activeCategory && p.isFeatured
    );
    return categoryFeaturedProjects.length > 0 ? categoryFeaturedProjects[0] : null;
  }, [activeCategory]);
  
  const featuredProject = getFeaturedProject();
  
  return (
    <div className="min-h-screen pt-24 md:pt-28">
      <Helmet>
        <title>Loveable - Fast-Loading Interior Design Portfolio</title>
        <meta name="description" content="Explore Loveable's fast-loading portfolio of warm, elegant interiors, starting at 15k. Founded in 2012 by Dalaram Suthar with 600+ projects across Tier 1 cities." />
        <meta property="og:title" content="Loveable - Fast-Loading Interior Design Portfolio" />
        <meta property="og:description" content="Explore Loveable's fast-loading portfolio of warm, elegant interiors, starting at 15k. Founded in 2012 by Dalaram Suthar with 600+ projects across Tier 1 cities." />
        
        {/* Critical preloads for featured project and first few portfolio items */}
        {featuredProject && (
          <link rel="preload" as="image" href={featuredProject.images[0]} fetchPriority="high" />
        )}
        
        {/* Preconnect to image host domains to speed up loading */}
        <link rel="preconnect" href="https://lovable.app" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </Helmet>
      
      {/* Portfolio Header - Improved mobile spacing */}
      <motion.section 
        className="bg-warmWhite py-16 md:py-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-playfair mb-4 md:mb-6">Our Portfolio</h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of projects spanning residences, offices, 
            retail spaces, and restaurants across India's major cities
          </p>
          
          <p className="text-roseGold/90 mt-3 text-base md:text-lg">
            Founded in 2012 by Dalaram Suthar • 600+ Projects Across Tier 1 Cities • Starting at ₹15k
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
      
      {/* Featured Project - Preloaded for instant visibility */}
      {featuredProject && (
        <section className="py-10 md:py-12 px-4 bg-warmWhite">
          <div className="container mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl mb-6 md:mb-8 text-center">Featured Project</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="group max-w-5xl mx-auto"
            >
              <Link to={`/portfolio/${featuredProject.id}`} key={featuredProject.id} className="block">
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <AspectRatio ratio={getFeaturedAspectRatio()} className="bg-lightGray/30">
                    {!isLoaded && (
                      <Skeleton className="w-full h-full absolute inset-0" />
                    )}
                    <picture>
                      {/* WebP for modern browsers */}
                      <source 
                        type="image/webp" 
                        srcSet={`${featuredProject.images[0]} 600w, ${featuredProject.images[0]} 1000w`} 
                        sizes="(max-width: 640px) 100vw, 1000px"
                      />
                      
                      {/* AVIF for browsers with best compression support */}
                      <source 
                        type="image/avif" 
                        srcSet={`${featuredProject.images[0]} 600w, ${featuredProject.images[0]} 1000w`} 
                        sizes="(max-width: 640px) 100vw, 1000px"
                      />
                      
                      {/* Responsive sources for different devices */}
                      <source 
                        media="(max-width: 640px)" 
                        srcSet={featuredProject.images[0]}
                      />
                      
                      <img 
                        src={featuredProject.images[0]} 
                        alt={`Fast-loading ${featuredProject.title} interior by Loveable in ${featuredProject.location}`}
                        className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                          isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="eager" 
                        width={1000}
                        height={563}
                        fetchPriority="high"
                        decoding="sync"
                        style={{
                          aspectRatio: `${getFeaturedAspectRatio()}`,
                          objectFit: "cover"
                        }}
                      />
                    </picture>
                  </AspectRatio>
                  <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                    <span className="text-roseGold/90 uppercase tracking-wider text-sm mb-3">Featured Project</span>
                    <h3 className="font-playfair text-white text-2xl md:text-3xl mb-2">{featuredProject.title}</h3>
                    <p className="text-white/90 mb-4 text-base md:text-lg">
                      {featuredProject.category} | {featuredProject.location}
                      {featuredProject.designer && ` | Designed by ${featuredProject.designer}`}
                    </p>
                    <span className="inline-flex items-center gap-2 text-roseGold/90 border border-roseGold/90 px-5 py-3 rounded text-base">
                      View Project <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
                <div className="mt-5 px-1 text-center">
                  <h3 className="font-playfair text-xl md:text-2xl">{featuredProject.title}</h3>
                  <p className="text-darkGray/80 text-base md:text-lg">
                    {featuredProject.category} | {featuredProject.location}
                    {featuredProject.designer && ` | Designed by ${featuredProject.designer}`}
                  </p>
                  {featuredProject.tagline && (
                    <p className="text-roseGold/90 text-base md:text-lg mt-1 italic font-light">
                      {featuredProject.tagline}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Projects Grid - Mobile optimized spacing and sizing */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-warmWhite">
        <div className="container mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl mb-8 md:mb-10">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProjects
              .filter(p => p.id !== featuredProject?.id) // Exclude the featured project
              .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }} // Cap delay for better performance
              >
                <MemoizedProjectCard 
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  image={project.images[0]}
                  designer={project.designer}
                  tagline={project.tagline}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <p className="text-2xl">No projects found in this category</p>
            </div>
          )}
          
          {/* Additional info footer */}
          <div className="mt-16 text-center">
            <p className="text-darkGray text-base">
              Our portfolio loads instantly, showcasing spaces you'll love! <span className="text-roseGold">Quality and speed, together.</span>
            </p>
            <p className="mt-4 text-sm text-darkGray/70 mandala-pattern-bg py-6 px-4 rounded-md">
              Founded in 2012 by Dalaram Suthar • 600+ Projects Across Tier 1 Cities • Starting at ₹15,000 Total
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
