import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";
import { isLikelySlowConnection } from "@/utils/imageUtils";
import projectsData from "../data/projectsData";
import FeaturedProject from "@/components/portfolio/FeaturedProject";

const PortfolioPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Residential", "Commercial", "Hospitality"];
  const connectionSpeed = useRef<'slow'|'normal'|'fast'>('normal');
  const isMobile = useIsMobile();
  
  // Get the featured project (Bopdev Machi Restaurant)
  const featuredProject = projectsData.find(project => project.id === "bopdev-machi-restaurant") || projectsData[0];
  
  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
    connectionSpeed.current = isLikelySlowConnection() ? 'slow' : 'normal';
    
    // Add DNS prefetch for all image domains
    const addDomainHints = () => {
      const domains = new Set<string>();
      
      // Extract unique domains from project images
      projectsData.forEach(project => {
        if (project.images && project.images.length > 0) {
          const url = new URL(project.images[0], window.location.origin);
          domains.add(url.hostname);
        }
      });
      
      // Add DNS prefetch and preconnect for each domain
      domains.forEach(domain => {
        // Add DNS prefetch
        if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'dns-prefetch';
          prefetchLink.href = `//${domain}`;
          document.head.appendChild(prefetchLink);
          
          // Add preconnect
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = `//${domain}`;
          preconnectLink.crossOrigin = 'anonymous';
          document.head.appendChild(preconnectLink);
        }
      });
    };
    
    addDomainHints();
    
    // Preload critical featured project images
    if (featuredProject) {
      const preloadImage = new Image();
      preloadImage.fetchPriority = 'high';
      preloadImage.src = featuredProject.images[0];
    }
    
    // Preload first image of each project for optimal grid view loading
    const preloadThumbnails = () => {
      // Only preload a limited number of thumbnails on slow connections
      const preloadLimit = connectionSpeed.current === 'slow' ? 3 : 6;
      
      const visibleProjects = activeCategory === "All" 
        ? projectsData.slice(0, preloadLimit) 
        : projectsData.filter(p => p.category === activeCategory).slice(0, preloadLimit);
        
      visibleProjects.forEach((project, index) => {
        // Stagger preloads to avoid network congestion
        setTimeout(() => {
          const img = new Image();
          img.src = project.images[0];
          // Only high priority for the first few
          img.fetchPriority = index < 3 ? 'high' : 'auto';
        }, index * 100);
      });
    };
    
    preloadThumbnails();
  }, [activeCategory, featuredProject]);
  
  // Filter projects based on selected category
  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16">
      <Helmet>
        <title>Loveable - Featured Project: Bopdev Machi Restaurant</title>
        <meta 
          name="description" 
          content="Explore Bopdev Machi Restaurant's warm interiors, featured on Loveable's fast-loading mobile portfolio, starting at 15k."
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
        <meta httpEquiv="Cache-Control" content="max-age=7776000" /> {/* 90 days */}
      </Helmet>
      
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="sticky top-[60px] bg-warmWhite/95 backdrop-blur-sm py-4 z-[900] text-lg md:text-2xl font-playfair text-darkGray mb-8">
          Our Portfolio
        </h1>
        
        {/* Mobile-Optimized Featured Section */}
        <div className="mb-12">
          {isMobile ? (
            <div className="min-h-[400px] bg-gradient-to-b from-warmWhite to-lightGray/20 rounded-lg p-6 shadow-sm">
              <h2 className="font-playfair text-[20px] text-darkGray font-normal mb-4">
                Featured Project: {featuredProject.title}
              </h2>
              
              <p className="font-lato text-[13px] text-darkGray/90 font-light leading-[1.7] mb-6">
                Step into the heart of Pune's Askarwadi with Bopdev Machi Restaurant, where rustic 
                Maharashtrian charm meets modern elegance. This 2,500 sq ft space features warm teak 
                wood accents, Warli-inspired art, and vibrant brass lighting, crafted by Loveable in 
                2025 for a memorable dining experience.
              </p>
              
              <div className="space-y-4">
                <a 
                  href={`/portfolio/${featuredProject.id}`}
                  className="inline-block font-lato text-[14px] text-roseGold border border-roseGold/90 
                           px-4 py-2 rounded hover:bg-roseGold/10 transition-colors"
                >
                  Explore More
                </a>
                
                <p className="text-[11px] text-darkGray/70 italic">
                  Designed with Loveable's expertise since 2012
                </p>
              </div>
            </div>
          ) : (
            // Featured Project
            <div>
              {isLoaded && <FeaturedProject project={featuredProject} isLoaded={isLoaded} onLoad={() => setIsLoaded(true)} />}
            </div>
          )}
        </div>
        
        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        {/* Projects Grid */}
        <ProjectsGrid projects={filteredProjects} />
        
        {/* Performance Note */}
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
