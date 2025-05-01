
import { Project } from "@/data/projectsData";
import ProjectHeroMeta from "./ProjectHeroMeta";
import ProjectHeroImage from "./ProjectHeroImage";
import ProjectHeroInfo from "./ProjectHeroInfo";
import ProjectHeroNavigation from "./ProjectHeroNavigation";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectHeroProps {
  project: Project;
  activeImageIndex: number;
  prevImage: () => void;
  nextImage: () => void;
}

const ProjectHero = ({ project, activeImageIndex, prevImage, nextImage }: ProjectHeroProps) => {
  const getImageDimensions = () => {
    let width = 1200;
    let height = 900;
    
    if (typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 640) {
        width = 640;
        height = 480;
      } else if (viewportWidth < 1024) {
        width = 960;
        height = 720;
      }
    }
    
    return { width, height };
  };
  
  const { width, height } = getImageDimensions();

  return (
    <section 
      className="w-full h-[100vh] relative"
      aria-label={`${project.title} project showcase`}
    >
      <ProjectHeroMeta project={project} activeImageIndex={activeImageIndex} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <ProjectHeroImage
            src={project.images[activeImageIndex]}
            alt={`${project.title} interior in ${project.location}, image ${activeImageIndex + 1} of ${project.images.length}`}
            width={width}
            height={height}
          />
        </motion.div>
      </AnimatePresence>
      
      <ProjectHeroInfo project={project} />
      
      <ProjectHeroNavigation
        onPrev={prevImage}
        onNext={nextImage}
        currentIndex={activeImageIndex}
        totalImages={project.images.length}
      />
    </section>
  );
};

export default ProjectHero;
