
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from "../OptimizedImage";
import { Helmet } from "react-helmet";
import { Project } from "@/data/projectsData";
import { useState, useEffect } from "react";

interface ProjectHeroProps {
  project: Project;
  activeImageIndex: number;
  prevImage: () => void;
  nextImage: () => void;
}

const ProjectHero = ({ project, activeImageIndex, prevImage, nextImage }: ProjectHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloadedIndices, setPreloadedIndices] = useState<number[]>([]);
  
  // Preload the next image to ensure smooth transitions
  useEffect(() => {
    // Mark the current image as loaded
    setIsLoaded(true);
    
    // Preload the next few images for smoother navigation
    const indicesToPreload = [];
    
    // Preload next image
    const nextIndex = (activeImageIndex + 1) % project.images.length;
    if (!preloadedIndices.includes(nextIndex)) {
      indicesToPreload.push(nextIndex);
    }
    
    // Preload previous image
    const prevIndex = activeImageIndex === 0 ? project.images.length - 1 : activeImageIndex - 1;
    if (!preloadedIndices.includes(prevIndex)) {
      indicesToPreload.push(prevIndex);
    }
    
    // Update the list of preloaded indices
    if (indicesToPreload.length > 0) {
      setPreloadedIndices(prev => [...prev, ...indicesToPreload]);
    }
  }, [activeImageIndex, project.images.length, preloadedIndices]);

  // Calculate approximate image dimensions for the hero, optimized for different devices
  const getImageDimensions = () => {
    // Default dimensions (desktop)
    let width = 1000;
    let height = 563;
    
    // Adapt based on viewport (if client-side)
    if (typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 640) {
        // Mobile
        width = 500;
        height = 281;
      } else if (viewportWidth < 1024) {
        // Tablet
        width = 800;
        height = 450;
      }
    }
    
    return { width, height };
  };
  
  const { width, height } = getImageDimensions();
  
  // Customize meta data based on project ID
  const getCustomMetaDescription = () => {
    if (project.id === "bhushan-naikwadi-elegant-abode") {
      return `Explore the warm, culturally rich interiors of Mr. Bhushan Naikwadi's Pune home by Loveable, designed for timeless comfort. Projects starting at 15k.`;
    }
    
    return `Explore the warm, elegant interiors of ${project.title} in ${project.location} by Loveable, designed with Indian craftsmanship. Projects starting at 15k.`;
  };
  
  // Preload links for next and previous images with enhanced attributes
  const renderPreloadLinks = () => {
    const links = [];
    
    // Add preload for next image
    const nextIndex = (activeImageIndex + 1) % project.images.length;
    links.push(
      <link 
        key={`preload-next-${nextIndex}`}
        rel="preload" 
        as="image" 
        href={project.images[nextIndex]} 
        // Use data attributes to avoid React warnings
        data-fetchpriority="low"
        crossOrigin="anonymous"
      />
    );
    
    // Add preload for previous image
    const prevIndex = activeImageIndex === 0 ? project.images.length - 1 : activeImageIndex - 1;
    links.push(
      <link 
        key={`preload-prev-${prevIndex}`}
        rel="preload" 
        as="image" 
        href={project.images[prevIndex]} 
        data-fetchpriority="low"
        crossOrigin="anonymous"
      />
    );
    
    return links;
  };

  return (
    <section className="w-full h-[100vh] relative">
      <Helmet>
        <title>Loveable - {project.title} Interior Design</title>
        <meta name="description" content={getCustomMetaDescription()} />
        <meta property="og:title" content={`Loveable - ${project.title} Interior Design`} />
        <meta property="og:description" content={`Explore the warm, elegant interiors of ${project.title} in ${project.location} by Loveable, designed with Indian craftsmanship. Founded in 2012.`} />
        <meta property="og:image" content={project.images[0]} />
        <meta name="keywords" content={`interior design, ${project.category.toLowerCase()}, ${project.location}, Indian design, luxury interiors, ${project.title.toLowerCase()}, fast-loading`} />
        <meta name="author" content="Loveable Interiors" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://loveable.com/portfolio/${project.id}`} />
        
        {/* DNS prefetch for image domains */}
        <link rel="dns-prefetch" href="https://lovable.app" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        
        {/* Preconnect to image domains */}
        <link rel="preconnect" href="https://lovable.app" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
        
        {/* Preload critical images */}
        <link 
          rel="preload" 
          as="image" 
          href={project.images[activeImageIndex]} 
          data-fetchpriority="high"
          crossOrigin="anonymous"
        />
        {renderPreloadLinks()}
      </Helmet>
      
      <div className="absolute inset-0">
        <OptimizedImage 
          src={project.images[activeImageIndex]} 
          alt={`${project.title} - Fast-loading interior design by Loveable in ${project.location}`} 
          className="w-full h-full object-cover"
          priority={true}
          width={width}
          height={height}
          preload={true}
        />
        
        {/* Hidden preload for next image */}
        {preloadedIndices.map(index => (
          <div key={`preload-${index}`} className="hidden">
            <OptimizedImage 
              src={project.images[index]} 
              alt={`Preload ${project.title} image`} 
              className="hidden" 
              width={Math.floor(width/2)}
              height={Math.floor(height/2)}
              preload={true}
              skipLazyLoading={true}
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-end">
          <div className="container mx-auto p-8 md:p-16 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                {project.title}
              </h1>
              <p className="text-white/90 text-xl md:text-2xl">
                {project.category} | {project.location}
                {project.designer && ` | Designed by ${project.designer}`}
              </p>
              {project.tagline && (
                <p className="text-roseGold/90 text-xl mt-3 italic">
                  {project.tagline}
                </p>
              )}
              
              <p className="text-white/80 text-base mt-4">
                Founded in 2012 by Dalaram Suthar • 600+ Projects Across Tier 1 Cities • Starting at ₹15,000
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button 
          className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 bg-black/30 hover:bg-black/60 transition-colors p-3 md:p-4 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-roseGold/50"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 bg-black/30 hover:bg-black/60 transition-colors p-3 md:p-4 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-roseGold/50"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default ProjectHero;
