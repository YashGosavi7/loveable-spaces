
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
      // Scroll to top when project changes
      window.scrollTo(0, 0);
    }
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
      {/* Enhanced SEO with Helmet */}
      <Helmet>
        <title>{`${project.title} | Balaji Design Studio`}</title>
        <meta name="description" content={`Explore ${project.title} by Balaji Design Studio in ${project.location}. ${project.tagline || 'View our interior design project'}.`} />
        <meta property="og:title" content={`${project.title} | Balaji Design Studio`} />
        <meta property="og:description" content={`Interior design project in ${project.location}. ${project.tagline || ''}`} />
        <meta property="og:image" content={project.images[0]} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`/portfolio/${project.id}`} />
      </Helmet>
      
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
