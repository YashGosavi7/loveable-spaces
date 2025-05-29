
import { Project } from "@/data/projectsData";
import ProjectHeroMeta from "./ProjectHeroMeta";
import ProjectHeroImage from "./ProjectHeroImage";
import ProjectHeroInfo from "./ProjectHeroInfo";

interface ProjectHeroProps {
  project: Project;
  activeImageIndex: number;
}

const ProjectHero = ({ project, activeImageIndex }: ProjectHeroProps) => {
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
    <section className="w-full h-[100vh] relative">
      <ProjectHeroMeta project={project} activeImageIndex={activeImageIndex} />
      
      <ProjectHeroImage
        src={project.images[activeImageIndex]}
        alt={`${project.title} interior in ${project.location}`}
        width={width}
        height={height}
      />
      
      <ProjectHeroInfo project={project} />
    </section>
  );
};

export default ProjectHero;
