
import { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";
import { isLikelySlowConnection, getOptimizedImageUrl } from "@/utils/imageUtils";
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
        if (conn.effectiveType === '3g') return 'medium';
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
      if (speed === 'slow') preloadLimit = 1;
      else if (speed === 'fast') preloadLimit = 6;
      else preloadLimit = 3;
      
      if (isMobile && preloadLimit > 3) preloadLimit = 3;
      
      const visibleProjects = projectsData
        .filter(p => p.category === activeCategory)
        .slice(0, preloadLimit);
      
      visibleProjects.forEach((project, index) => {
        if (project.images?.length > 0) {
          const imageUrl = project.images[0];
          
          if (prefetchedImages.current.has(imageUrl)) return;
          prefetchedImages.current.add(imageUrl);
          
          if (index < 2) {
             setTimeout(() => {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = imageUrl;
              link.fetchPriority = 'high';
              link.type = 'image/webp';
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
    <div className="min-h-screen">
      <Helmet>
        <title>Interior Design Portfolio: Residential, Commercial, Hospitality - Balaji Design Studio</title>
        <meta 
          name="description" 
          content="Explore Balaji Design Studio's portfolio with timeless interiors since 2007. Over 600 projects across Tier 1 cities."
        />
        
        <link rel="dns-prefetch" href={window.location.origin} />
        <link rel="preconnect" href={window.location.origin} crossOrigin="anonymous" />
        
        {firstProjectImage && (
          <link 
            rel="preload" 
            as="image" 
            href={getOptimizedImageUrl(firstProjectImage, 1200, 50, "webp")}
            fetchPriority="high"
            type="image/webp"
            crossOrigin="anonymous"
          />
        )}
        
        <meta httpEquiv="Cache-Control" content="public, max-age=15552000" />
      </Helmet>
      
      {/* Fixed Navigation Space */}
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* Sticky Portfolio Header */}
          <div className="sticky top-[64px] md:top-[80px] bg-warmWhite/95 backdrop-blur-sm py-4 z-[900] border-b border-roseGold/10">
            <h1 className="text-lg md:text-2xl font-playfair text-darkGray mb-2">
              Our Portfolio
            </h1>
            <h2 className="font-playfair text-[20px] text-darkGray font-normal text-center mb-4">
              Explore Our Portfolio: Spaces Designed with Attention to Detail
            </h2>
            <p className="text-center text-darkGray/80 font-lato text-sm">
              Founded in 2007, with over 600 projects across Tier 1 cities.
            </p>
          </div>
          
          <div className="mb-8 flex justify-center pt-6">
            <WhatsAppCTA />
          </div>
          
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          {/* Vertical Scrolling Project Gallery */}
          <div className="flex flex-col gap-16 mt-8">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="project-section">
                {/* Project Hero Image */}
                <div className="mb-6">
                  <img
                    src={getOptimizedImageUrl(project.images[0], 1200, 55, "webp")}
                    alt={`Hero image of ${project.title} by Balaji Design Studio`}
                    className="w-full max-h-[600px] object-cover rounded-lg"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding={index < 2 ? "sync" : "async"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                  />
                </div>
                
                {/* Project Title and Location */}
                <div className="mb-4">
                  <h3 className="font-playfair text-2xl text-darkGray mb-2">{project.title}</h3>
                  <p className="text-darkGray/70 font-lato">{project.location}</p>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="mb-6 overflow-x-auto">
                  <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
                    {project.images.slice(1, 7).map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={getOptimizedImageUrl(image, 100, 40, "webp")}
                        alt={`${project.title} thumbnail ${imgIndex + 1}`}
                        className="w-[100px] h-[75px] object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="mb-4">
                  <p className="text-darkGray font-lato text-sm leading-relaxed">
                    {project.description || `Experience the perfect blend of functionality and aesthetics in this ${project.category.toLowerCase()} project by Balaji Design Studio.`}
                  </p>
                </div>
                
                {/* Key Features */}
                <div className="mb-8">
                  <h4 className="font-playfair text-lg text-darkGray mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-roseGold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-darkGray font-lato text-sm">Timeless design aesthetic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-roseGold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-darkGray font-lato text-sm">Optimal space utilization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-roseGold rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-darkGray font-lato text-sm">Premium material selection</span>
                    </li>
                  </ul>
                </div>
                
                {/* Mandala Separator */}
                {index < filteredProjects.length - 1 && (
                  <div className="border-b border-darkGray/10 mx-auto w-32 mb-8"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-darkGray font-lato text-[13px] md:text-base">
              Contact via WhatsApp!{" "}
              <span className="text-roseGold/90 ml-1">
                Expert interior design services for your unique space since 2007.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
