
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import projectsData from "../data/projectsData";
import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectGallery from "@/components/project/ProjectGallery";
import BackToPortfolio from "@/components/project/BackToPortfolio";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const project = projectsData.find(p => p.id === projectId);
  
  // Scroll to top when project changes and preload critical resources
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add critical CSS for ultra-fast rendering
    if (typeof document !== 'undefined') {
      const criticalCSS = `
        .gallery-hero { contain: layout style paint; }
        .thumbnail-grid { contain: layout; }
        img { content-visibility: auto; }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
      
      return () => {
        try {
          document.head.removeChild(style);
        } catch (e) {
          // Ignore if already removed
        }
      };
    }
  }, [projectId]);

  // Project not found handling
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
  
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }} // Faster transition for better perceived performance
    >
      {/* Direct Gallery Display - No 'Residential' header */}
      <div className="pt-20"> {/* Account for fixed navbar */}
        <ProjectGallery project={project} />
      </div>
      
      {/* Project Details */}
      <ProjectDetails project={project} />
      
      {/* Back to Portfolio */}
      <BackToPortfolio />
    </motion.div>
  );
};

export default ProjectPage;
