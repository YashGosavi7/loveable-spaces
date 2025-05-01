
import { Helmet } from "react-helmet";
import { Project } from "@/data/projectsData";

interface ProjectHeroMetaProps {
  project: Project;
  activeImageIndex: number;
}

const ProjectHeroMeta = ({ project, activeImageIndex }: ProjectHeroMetaProps) => {
  const getCustomMetaDescription = () => {
    if (project.id === "bhushan-naikwadi-elegant-abode") {
      return `Explore the warm, culturally rich interiors of Mr. Bhushan Naikwadi's Pune home, designed for timeless comfort.`;
    }
    if (project.id === "bopdev-machi-restaurant") {
      return `Explore the vibrant, uncropped interiors of Bopdev Machi Restaurant in Pune by Loveable, designed for warmth and speed.`;
    }
    return `Explore the warm, elegant interiors of ${project.title} in ${project.location}.`;
  };

  const getCustomAltText = () => {
    if (project.id === "bopdev-machi-restaurant") {
      return `Fast-loading uncropped restaurant interior by Loveable for Bopdev Machi`;
    }
    return `Fast-loading uncropped ${project.category.toLowerCase()} interior by Loveable in ${project.location}`;
  };

  return (
    <Helmet>
      <title>{project.title} Interior Design</title>
      <meta name="description" content={getCustomMetaDescription()} />
      <meta property="og:title" content={`${project.title} Interior Design`} />
      <meta property="og:description" content={getCustomMetaDescription()} />
      <meta property="og:image" content={project.images[0]} />
      <meta name="keywords" content={`interior design, ${project.category.toLowerCase()}, ${project.location}, ${project.title.toLowerCase()}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={`https://loveable.com/portfolio/${project.id}`} />
      <link rel="preload" as="image" href={project.images[activeImageIndex]} data-fetchpriority="high" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default ProjectHeroMeta;
