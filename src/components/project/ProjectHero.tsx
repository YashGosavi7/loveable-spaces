
import { Project } from "@/data/projectsData";
import ProjectHeroMeta from "./ProjectHeroMeta";
import ProjectHeroImage from "./ProjectHeroImage";
import ProjectHeroInfo from "./ProjectHeroInfo";
import ProjectHeroNavigation from "./ProjectHeroNavigation";

interface ProjectHeroProps {
  project: Project;
  activeImageIndex: number;
  prevImage: () => void;
  nextImage: () => void;
}

const ProjectHero = ({ project, activeImageIndex, prevImage, nextImage }: ProjectHeroProps) => {
  const getImageDimensions = () => {
    let width = 1000;
    let height = 563;
    
    if (typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 640) {
        width = 500;
        height = 281;
      } else if (viewportWidth < 1024) {
        width = 800;
        height = 450;
      }
    }
    
    return { width, height };
  };
  
  const { width, height } = getImageDimensions();

  return (
    <section className="w-full h-[100vh] relative">
      <ProjectHeroMeta project={project} activeImageIndex={activeImageIndex} />
      
      <ProjectHeroImage
        src={project.images[activeImageIndex]}
        alt={`${project.title} interior in ${project.location}`}
        width={width}
        height={height}
      />
      
      <ProjectHeroInfo project={project} />
      
      <ProjectHeroNavigation
        onPrev={prevImage}
        onNext={nextImage}
      />
    </section>
  );
};

export default ProjectHero;
