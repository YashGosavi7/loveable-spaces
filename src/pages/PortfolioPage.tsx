
import { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import projectsData from "../data/projectsData";
import { Helmet } from "react-helmet";
import FeaturedProject from "@/components/portfolio/FeaturedProject";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";

const PortfolioPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Residential", "Commercial", "Hospitality"];
  
  // Get the featured project (first one that is marked as featured)
  const featuredProject = projectsData.find(project => project.isFeatured === true) || projectsData[0];
  
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
      </div>
    </div>
  );
};

export default PortfolioPage;
