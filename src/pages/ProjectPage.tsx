
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import projectsData from "../data/projectsData";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectThumbnails from "@/components/project/ProjectThumbnails";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectDetails from "@/components/project/ProjectDetails";
import BackToPortfolio from "@/components/project/BackToPortfolio";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Log available project IDs for debugging
  useEffect(() => {
    console.log("Available projects:", projectsData.map(p => p.id));
    console.log("Current projectId from URL:", projectId);
  }, [projectId]);
  
  const project = projectsData.find(p => p.id === projectId);
  
  // Reset active image when navigating between projects
  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
  }, [projectId]);

  // Scroll thumbnails to center the active image
  useEffect(() => {
    if (scrollContainerRef.current) {
      const thumbnails = scrollContainerRef.current.querySelectorAll(".thumbnail");
      if (thumbnails[activeImageIndex]) {
        const thumbnail = thumbnails[activeImageIndex] as HTMLElement;
        const container = scrollContainerRef.current;
        const scrollLeft = thumbnail.offsetLeft - (container.clientWidth - thumbnail.clientWidth) / 2;
        
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        });
      }
    }
  }, [activeImageIndex]);

  // Add debug logging for project
  useEffect(() => {
    if (project) {
      console.log("Found project:", project.title, project.images.length);
    } else {
      console.error("Project not found for ID:", projectId);
    }
  }, [project, projectId]);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 section-padding">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-3xl mb-6">Project Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the project you're looking for</p>
          <Link to="/portfolio" className="btn-primary">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }
  
  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };
  
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <ProjectHero 
        project={project} 
        activeImageIndex={activeImageIndex}
        prevImage={prevImage}
        nextImage={nextImage}
      />
      
      {/* Thumbnail Navigation */}
      <ProjectThumbnails
        project={project}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
        scrollContainerRef={scrollContainerRef}
      />
      
      {/* Project Gallery */}
      <ProjectGallery project={project} />
      
      {/* Project Details */}
      <ProjectDetails project={project} />
      
      {/* Back to Portfolio */}
      <BackToPortfolio />
    </motion.div>
  );
};

export default ProjectPage;
