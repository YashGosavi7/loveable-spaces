
import { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";
import { isLikelySlowConnection } from "@/utils/imageUtils";
import projectsData from "../data/projectsData";
import WhatsAppCTA from "@/components/portfolio/WhatsAppCTA";

const PortfolioPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  // Change default category to "All" to ensure all projects are visible initially
  const [activeCategory, setActiveCategory] = useState<string>("All");
  // Add "All" to categories
  const categories = ["All", "Residential", "Commercial", "Hospitality"];
  const connectionSpeed = useRef<'slow'|'normal'|'fast'>('normal');
  const isMobile = useIsMobile();
  const prefetchedImages = useRef<Set<string>>(new Set());
  
  // Add debugging logs to check projects
  useEffect(() => {
    console.log("Total projects in data:", projectsData.length);
    console.log("Hospitality projects:", projectsData.filter(p => p.category === "Hospitality").map(p => p.title));
  }, []);
  
  const detectConnectionSpeed = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      
      if (conn) {
        if (conn.saveData) return 'slow';
        if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return 'slow';
        if (conn.effectiveType === '3g') return 'medium';
        if (conn.downlink < 1) return 'slow';
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
          } catch (e) {
          }
        }
      });
      
      domains.forEach(domain => {
        if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'dns-prefetch';
          prefetchLink.href = `//${domain}`;
          document.head.appendChild(prefetchLink);
          
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
      if (speed === 'slow') preloadLimit = 2;
      else if (speed === 'fast') preloadLimit = 8;
      else preloadLimit = 4;
      
      if (isMobile && preloadLimit > 4) preloadLimit = 4;
      
      const visibleProjects = projectsData
        .filter(p => p.category === activeCategory)
        .slice(0, preloadLimit);
      
      visibleProjects.forEach((project, index) => {
        if (project.images?.length > 0) {
          const imageUrl = project.images[0];
          
          if (prefetchedImages.current.has(imageUrl)) return;
          prefetchedImages.current.add(imageUrl);
          
          setTimeout(() => {
            const link = document.createElement('link');
            link.rel = speed === 'slow' ? 'prefetch' : 'preload';
            link.as = 'image';
            link.href = imageUrl;
            link.fetchPriority = index < 2 ? 'high' : 'auto';
            document.head.appendChild(link);
          }, index * (speed === 'slow' ? 300 : 150));
        }
      });
    };
    
    preloadVisibleImages();
    
    return () => {
    };
  }, [activeCategory, isMobile, detectConnectionSpeed]);
  
  // Update filtering logic to include "All" category
  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);
    
  const firstProjectImage = filteredProjects.length > 0 ? filteredProjects[0].images[0] : '';

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-16">
      <Helmet>
        <title>Loveable - Fast-loading Portfolio: Residential, Commercial, and Hospitality Projects</title>
        <meta 
          name="description" 
          content="Loveable's portfolio loads instantly with top interiors in Residential, Commercial, and Hospitality, starting at 15k."
        />
        
        <link rel="dns-prefetch" href={window.location.origin} />
        <link rel="preconnect" href={window.location.origin} crossOrigin="anonymous" />
        
        {firstProjectImage && (
          <link 
            rel="preload" 
            as="image" 
            href={firstProjectImage} 
            fetchPriority="high"
            crossOrigin="anonymous"
          />
        )}
        
        <meta httpEquiv="Cache-Control" content="max-age=86400" />
      </Helmet>
      
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="sticky top-[84px] md:top-[100px] bg-warmWhite/95 backdrop-blur-sm py-4 z-[900] 
                       text-lg md:text-2xl font-playfair text-darkGray mb-8 border-b border-roseGold/10">
          Our Portfolio
        </h1>
        
        <div className="mb-8 py-4">
          <h2 className="font-playfair text-[20px] text-darkGray font-normal text-center mb-4">
            Explore Our Portfolio: Fast-Loading Spaces Designed with Love
          </h2>
          
          <p className="text-center text-darkGray/80 font-lato text-sm">
            Starting at 15k, over 600 projects across Tier 1 cities
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
            Our images load lightning-fast – Contact Dalpat Suthar via WhatsApp!{" "}
            <span className="text-roseGold/90 ml-1">
              Founded in 2012 by Dalaram Suthar with over 600 projects across Tier 1 cities, pricing from 15k total.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
