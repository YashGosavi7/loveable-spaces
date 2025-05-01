
import { motion } from "framer-motion";
import ProjectCard from "../ProjectCard";
import { Project } from "@/data/projectsData";
import { getBestProjectImage, preloadHighPriorityProjectImages } from "@/utils/imageSelection";
import { useEffect } from "react";

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  // Preload images for featured projects based on priority
  useEffect(() => {
    if (projects.length > 0) {
      const featuredProjectIds = projects.slice(0, 3).map(p => p.id);
      preloadHighPriorityProjectImages(featuredProjectIds);
    }
  }, [projects]);
  
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {projects.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-darkGray/80">No projects found in this category.</p>
        </div>
      ) : (
        projects.map((project, index) => {
          const bestImage = getBestProjectImage(project);
          
          return (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              location={project.location}
              image={bestImage}
              designer={project.designer}
              tagline={project.tagline}
              index={index}
              allImages={project.images.slice(0, 5)} // Limit to 5 images for performance
            />
          );
        })
      )}
    </motion.div>
  );
};

export default ProjectsGrid;
