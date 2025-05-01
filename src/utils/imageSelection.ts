
import { Project } from "@/data/projectsData";

interface ImageScore {
  url: string;
  score: number;
}

export const getBestProjectImage = (project: Project): string => {
  if (!project.images || project.images.length === 0) {
    return "";
  }

  // If there's only one image, use it
  if (project.images.length === 1) {
    return project.images[0];
  }

  // For now, we'll use the first image as the best one since we can't 
  // programmatically analyze image content without additional libraries
  // In a real implementation, this would use computer vision APIs
  // to analyze image quality, composition, and focal points
  return project.images[0];
};
