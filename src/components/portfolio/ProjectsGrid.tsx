
import { motion } from "framer-motion";
import ProjectCard from "../ProjectCard";
import { Project } from "@/data/projectsData";
import { getBestProjectImage } from "@/utils/imageSelection";

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {projects.map((project, index) => {
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
          />
        );
      })}
    </motion.div>
  );
};

export default ProjectsGrid;
