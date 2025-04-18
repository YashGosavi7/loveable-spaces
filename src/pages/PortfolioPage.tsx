
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projectsData";
import { Helmet } from "react-helmet";
import OptimizedImage from "@/components/OptimizedImage";

const PortfolioPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Residential", "Commercial", "Hospitality"];
  
  // Get the featured project (first one that is marked as featured)
  const featuredProject = projectsData.find(project => project.isFeatured === true) || projectsData[0];
  
  // Calculate aspect ratio for the featured project image
  const getFeaturedAspectRatio = () => {
    return "16/9"; // Default aspect ratio for featured image
  };
  
  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Preload critical featured project images
    if (featuredProject) {
      const preloadImage = new Image();
      preloadImage.src = featuredProject.images[0];
    }
    
    // Preload first image of each project for optimal grid view loading
    const preloadThumbnails = () => {
      const visibleProjects = activeCategory === "All" 
        ? projectsData.slice(0, 6) 
        : projectsData.filter(p => p.category === activeCategory).slice(0, 6);
        
      visibleProjects.forEach(project => {
        const img = new Image();
        img.src = project.images[0];
      });
    };
    
    preloadThumbnails();
  }, [activeCategory, featuredProject]);
  
  // Filter projects based on selected category
  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  // Generate placeholder colors based on project for smoother loading
  const getPlaceholderColor = (projectId: string) => {
    if (projectId === "gaikwad-luxe-bungalow") return "#f5f1ea";
    if (projectId === "bhushan-naikwadi-elegant-abode") return "#f4efe8";
    if (projectId === "grandeur-wedding-hall") return "#f5f0e9";
    return "#f5f2ed";
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Helmet>
        <title>Loveable - Portfolio of Interior Design Projects</title>
        <meta 
          name="description" 
          content="Explore Loveable's portfolio of beautifully designed interior spaces across India. Founded in 2012, we've completed over 600 projects in Tier 1 cities."
        />
        <meta 
          name="keywords" 
          content="interior design, portfolio, residential design, commercial design, hospitality design, Indian interiors, Loveable"
        />
        
        {/* DNS prefetch for image domains */}
        <link rel="dns-prefetch" href="https://lovable.app" />
        <link rel="preconnect" href="https://lovable.app" crossOrigin="anonymous" />
        
        {/* Preload critical images */}
        <link 
          rel="preload" 
          as="image" 
          href={featuredProject.images[0]} 
          fetchPriority="high"
          crossOrigin="anonymous"
        />
        
        {/* Cache control hints */}
        <meta httpEquiv="Cache-Control" content="max-age=5184000" /> {/* 60 days */}
      </Helmet>
      
      {/* Page Title */}
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle
          title="Our Portfolio"
          subtitle="Spaces designed with love"
        />
        
        {/* Featured Project */}
        <div className="mb-16">
          <h2 className="font-playfair text-2xl md:text-3xl mb-6">Featured Project</h2>
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
              <div 
                className="absolute inset-0 transition-opacity duration-300" 
                style={{ 
                  backgroundColor: getPlaceholderColor(featuredProject.id),
                  opacity: isLoaded ? 0 : 1 
                }}
              ></div>
              <picture>
                {/* WebP format for modern browsers */}
                <source 
                  type="image/webp" 
                  srcSet={`${featuredProject.images[0]} 500w, ${featuredProject.images[0]} 1000w`} 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1000px"
                />
                {/* AVIF format for browsers with best compression support */}
                <source 
                  type="image/avif" 
                  srcSet={`${featuredProject.images[0]} 500w, ${featuredProject.images[0]} 1000w`} 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1000px"
                />
                {/* Fallback image */}
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
                  onLoad={() => setIsLoaded(true)}
                />
              </picture>
            </div>
            <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
              <h3 className="font-playfair text-white text-2xl md:text-3xl mb-3">{featuredProject.title}</h3>
              <p className="text-white/90 mb-4">
                {featuredProject.category} | {featuredProject.location}
                {featuredProject.designer && ` | Designed by ${featuredProject.designer}`}
              </p>
              {featuredProject.tagline && (
                <p className="text-roseGold mb-4 italic">{featuredProject.tagline}</p>
              )}
              <span className="inline-flex items-center gap-2 text-roseGold border border-roseGold px-6 py-3 rounded">
                View Project
              </span>
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? "bg-roseGold/90 text-white"
                  : "bg-lightGray/20 text-darkGray hover:bg-lightGray/40"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.map((project, index) => (
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
        </motion.div>
        
        {/* Information Section */}
        <div className="mt-20 text-center">
          <p className="text-darkGray/80 mb-2">
            Founded in 2012 by Dalaram Suthar • 600+ Projects Across Tier 1 Cities
          </p>
          <p className="text-roseGold/90">Starting at ₹15,000 Total</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
