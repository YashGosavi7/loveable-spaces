
import { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";
import { isLikelySlowConnection, getOptimizedImageUrl } from "@/utils/imageUtils"; // Added getOptimizedImageUrl import
import projectsData from "../data/projectsData";
import WhatsAppCTA from "@/components/portfolio/WhatsAppCTA";

const PortfolioPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Residential");
  const categories = ["Residential", "Commercial", "Hospitality"];
  const connectionSpeed = useRef<'slow'|'normal'|'fast'>('normal');
  const isMobile = useIsMobile();
  const prefetchedImages = useRef<Set<string>>(new Set());
  
  const detectConnectionSpeed = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      
      if (conn) {
        if (conn.saveData) return 'slow';
        if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return 'slow';
        if (conn.effectiveType === '3g') return 'medium'; // Considering 3G as medium for general detection
        if (conn.downlink < 1 && conn.effectiveType !== '4g') return 'slow';
        if (conn.downlink >= 5) return 'fast';
        return 'normal';
      }
    }
    
    return isLikelySlowConnection() ? 'slow' : 'normal';
  }, []);
  
  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
    connectionSpeed.current = detectConnectionSpeed() as 'slow' | 'normal' | 'fast';
    
    const addDomainHints = () => {
      const domains = new Set<string>();
      projectsData.forEach(project => {
        if (project.images && project.images.length > 0) {
          try {
            const url = new URL(project.images[0], window.location.origin);
            domains.add(url.hostname);
          } catch (e) { /* ignore */ }
        }
      });
      domains.forEach(domain => {
        if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'dns-prefetch';
          prefetchLink.href = `//${domain}`;
          document.head.appendChild(prefetchLink);
        }
        if (!document.querySelector(`link[rel="preconnect"][href="//${domain}"]`)) {
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = `//${domain}`;
          preconnectLink.crossOrigin = 'anonymous';
          document.head.appendChild(preconnectLink);
        }
      });
    };
    addDomainHints();
    
    const preloadVisibleImages = () => {
      const speed = connectionSpeed.current;
      
      let preloadLimit: number;
      if (speed === 'slow') preloadLimit = 1; // More conservative on slow
      else if (speed === 'fast') preloadLimit = 6;
      else preloadLimit = 3;
      
      if (isMobile && preloadLimit > 3) preloadLimit = 3;
      
      const visibleProjects = projectsData
        .filter(p => p.category === activeCategory)
        .slice(0, preloadLimit);
      
      visibleProjects.forEach((project, index) => {
        if (project.images?.length > 0) {
          const imageUrl = project.images[0]; // This will be optimized by OptimizedImage component
          
          if (prefetchedImages.current.has(imageUrl)) return;
          prefetchedImages.current.add(imageUrl);
          
          // Preloading is now primarily handled by OptimizedImage and useImagePreload.
          // This explicit preloading can be reduced or removed if causing conflicts.
          // For now, let's keep it minimal.
          if (index < 2) { // Only high priority for very first images
             setTimeout(() => {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = imageUrl; // Original URL, OptimizedImage will handle params
              link.fetchPriority = 'high';
              link.type = 'image/webp'; // Assume WebP
              document.head.appendChild(link);
            }, index * 100);
          }
        }
      });
    };
    
    preloadVisibleImages();
    
    return () => {
    };
  }, [activeCategory, isMobile, detectConnectionSpeed]);
  
  const filteredProjects = projectsData.filter(project => project.category === activeCategory);
  const firstProjectImage = filteredProjects.length > 0 && filteredProjects[0].images.length > 0 ? filteredProjects[0].images[0] : '';

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-16">
      <Helmet>
        <title>Interior Design Portfolio: Residential, Commercial, Hospitality</title>
        <meta 
          name="description" 
          content="Explore Balaji Design Studio’s portfolio with fast-loading project galleries."
        />
        
        <link rel="dns-prefetch" href={window.location.origin} />
        <link rel="preconnect" href={window.location.origin} crossOrigin="anonymous" />
        
        {firstProjectImage && (
          <link 
            rel="preload" 
            as="image" 
            href={getOptimizedImageUrl(firstProjectImage, 1200, 50, "webp")} // Example optimized URL
            fetchPriority="high"
            type="image/webp"
            crossOrigin="anonymous"
          />
        )}
        
        <meta httpEquiv="Cache-Control" content="public, max-age=15552000" /> {/* 180 days */}
      </Helmet>
      
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="sticky top-[84px] md:top-[100px] bg-warmWhite/95 backdrop-blur-sm py-4 z-[900] 
                       text-lg md:text-2xl font-playfair text-darkGray mb-8 border-b border-roseGold/10">
          Our Portfolio
        </h1>
        
        <div className="mb-8 py-4">
          <h2 className="font-playfair text-[20px] text-darkGray font-normal text-center mb-4">
            Explore Our Portfolio: Spaces Designed with Attention to Detail
          </h2>
          
          <p className="text-center text-darkGray/80 font-lato text-sm">
            Founded in 2012, with over 600 projects across Tier 1 cities.
          </p>
        </div>
        
        <div className="mb-8 flex justify-center">
          <WhatsAppCTA />
        </div>
        
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <ProjectsGrid projects={filteredProjects} />
        
        <div className="mt-16 text-center">
          <p className="text-darkGray font-lato text-[13px] md:text-base">
            Contact via WhatsApp!{" "}
            <span className="text-roseGold/90 ml-1">
              Expert interior design services for your unique space.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
