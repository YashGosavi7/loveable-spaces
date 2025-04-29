
import { motion } from "framer-motion";
import ProjectCard from "../ProjectCard";
import { Project } from "@/data/projectsData";
import { getBestProjectImage } from "@/utils/imageSelection";

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  console.log("Projects in grid:", projects.map(p => ({id: p.id, title: p.title, category: p.category})));
  
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
          console.log(`Rendering project ${project.id} with image: ${bestImage}`);
          console.log(`Total images for ${project.id}: ${project.images.length}`);
          
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
              allImages={project.images} // Pass all images to enable the photo glimpse feature
            />
          );
        })
      )}
    </motion.div>
  );
};

export default ProjectsGrid;
