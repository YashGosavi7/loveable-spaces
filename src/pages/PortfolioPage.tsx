
import { useState, useEffect, useRef } from "react";
import SectionTitle from "../components/SectionTitle";
import projectsData from "../data/projectsData";
import { Helmet } from "react-helmet";
import FeaturedProject from "@/components/portfolio/FeaturedProject";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";
import { isLikelySlowConnection } from "@/utils/imageUtils";

const PortfolioPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Residential", "Commercial", "Hospitality"];
  const connectionSpeed = useRef<'slow'|'normal'|'fast'>('normal');
  
  // Get the featured project (first one that is marked as featured)
  const featuredProject = projectsData.find(project => project.isFeatured === true) || projectsData[0];
  
  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Detect connection speed
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
        <meta httpEquiv="Cache-Control" content="max-age=7776000" /> {/* 90 days */}
      </Helmet>
      
      {/* Page Title */}
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle
          title="Our Portfolio"
          subtitle="Spaces designed with love"
        />
        
        {/* Featured Project */}
        <FeaturedProject 
          project={featuredProject}
          isLoaded={isLoaded}
          onLoad={() => setIsLoaded(true)}
        />
        
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
          <p className="text-darkGray font-lato text-sm md:text-base">
            Our portfolio images load fast and display perfectly, showcasing spaces you'll love! 
            <span className="text-roseGold ml-1">Founded in 2012 by Dalaram Suthar with over 600 projects across Tier 1 cities.</span>
          </p>
          <p className="text-darkGray/80 text-sm mt-2">
            Pricing starting at ₹15k total. Experience quality design that loads as fast as it impresses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
