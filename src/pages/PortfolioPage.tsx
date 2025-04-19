import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";
import { isLikelySlowConnection } from "@/utils/imageUtils";
import projectsData from "../data/projectsData";
import WhatsAppCTA from "@/components/portfolio/WhatsAppCTA";

const PortfolioPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Residential");
  const categories = ["Residential", "Commercial", "Hospitality"];
  const connectionSpeed = useRef<'slow'|'normal'|'fast'>('normal');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
    connectionSpeed.current = isLikelySlowConnection() ? 'slow' : 'normal';
    
    const addDomainHints = () => {
      const domains = new Set<string>();
      
      projectsData.forEach(project => {
        if (project.images && project.images.length > 0) {
          const url = new URL(project.images[0], window.location.origin);
          domains.add(url.hostname);
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
    
    const preloadThumbnails = () => {
      const preloadLimit = connectionSpeed.current === 'slow' ? 3 : 6;
      
      const visibleProjects = projectsData
        .filter(p => p.category === activeCategory)
        .slice(0, preloadLimit);
        
      visibleProjects.forEach((project, index) => {
        setTimeout(() => {
          const img = new Image();
          img.src = project.images[0];
          img.fetchPriority = index < 3 ? 'high' : 'auto';
        }, index * 100);
      });
    };
    
    preloadThumbnails();
  }, [activeCategory]);
  
  const filteredProjects = projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16">
      <Helmet>
        <title>Loveable - Portfolio: Residential, Commercial, and Hospitality Projects</title>
        <meta 
          name="description" 
          content="Explore Loveable's top interiors in Residential, Commercial, and Hospitality, contact Dalpat on WhatsApp from 15k."
        />
        
        <link rel="dns-prefetch" href="https://lovable.app" />
        <link rel="preconnect" href="https://lovable.app" crossOrigin="anonymous" />
        
        <link 
          rel="preload" 
          as="image" 
          href={filteredProjects.length > 0 ? filteredProjects[0].images[0] : ''} 
          fetchPriority="high"
          crossOrigin="anonymous"
        />
        
        <meta httpEquiv="Cache-Control" content="max-age=7776000" />
      </Helmet>
      
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="sticky top-[60px] bg-warmWhite/95 backdrop-blur-sm py-4 z-[900] text-lg md:text-2xl font-playfair text-darkGray mb-8">
          Our Portfolio
        </h1>
        
        <div className="mb-8 py-4">
          <h2 className="font-playfair text-[20px] text-darkGray font-normal text-center mb-4">
            Explore Our Portfolio: Spaces Designed with Love
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
            Our mobile portfolio shines with fast, engaging designs!{" "}
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
