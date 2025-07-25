
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import projectsData from "../data/projectsData";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectGallery from "@/components/project/ProjectGallery";
import BackToPortfolio from "@/components/project/BackToPortfolio";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const project = projectsData.find(p => p.id === projectId);
  
  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
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
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section - stable hero image without navigation */}
      <ProjectHero 
        project={project} 
        activeImageIndex={0}
      />
      
      {/* Project Gallery with direct lightbox functionality */}
      <ProjectGallery project={project} />
      
      {/* Project Details */}
      <ProjectDetails project={project} />
      
      {/* Back to Portfolio */}
      <BackToPortfolio />
    </motion.div>
  );
};

export default ProjectPage;
