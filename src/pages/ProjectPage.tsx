
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProjectHero from '../components/project/ProjectHero';
import ProjectDetails from '../components/project/ProjectDetails';
import ProjectGallery from '../components/project/ProjectGallery';
import ProjectThumbnails from '../components/project/ProjectThumbnails';
import projectsData from '../data/projectsData';

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const project = projectsData.find(p => p.id === projectId);
  
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Balaji Design Studio`;
      
      // Add meta tags for better SEO
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Explore ${project.title} by Balaji Design Studio in ${project.location}. ${project.tagline}. View all project images instantly.`
        );
      }
    }
    
    // Scroll to top when project changes
    window.scrollTo(0, 0);
  }, [project]);
  
  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }
  
  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="min-h-screen">
      <ProjectHero 
        project={project} 
        activeImageIndex={activeImageIndex}
        prevImage={prevImage}
        nextImage={nextImage}
      />
      
      <ProjectThumbnails 
        project={project}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
        scrollContainerRef={scrollContainerRef}
      />
      
      <ProjectDetails project={project} />
      
      <ProjectGallery project={project} />
    </div>
  );
};

export default ProjectPage;
