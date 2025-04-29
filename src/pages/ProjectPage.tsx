
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProjectHero from '../components/project/ProjectHero';
import ProjectDetails from '../components/project/ProjectDetails';
import projectsData from '../data/projectsData';

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const project = projectsData.find(p => p.id === projectId);
  
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Balaji Design Studio`;
    }
  }, [project]);
  
  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }
  
  return (
    <div className="min-h-screen">
      <ProjectHero project={project} />
      <ProjectDetails project={project} />
    </div>
  );
};

export default ProjectPage;
