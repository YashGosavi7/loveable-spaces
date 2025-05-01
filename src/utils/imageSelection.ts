
import { Project } from "@/data/projectsData";

/**
 * Selects the best image for a project preview based on various factors
 * 
 * @param project Project object with images array
 * @returns The URL of the best image to use
 */
export const getBestProjectImage = (project: Project | { images: string[] }): string => {
  // If there are no images, return a placeholder
  if (!project || !project.images || project.images.length === 0) {
    return '/placeholder.svg';
  }
  
  // Special case handling for specific projects
  if ('id' in project) {
    // Mr. Samir Ghule's project - choose better preview image if available
    if (project.id === 'mr-samir-ghule-residence' && project.images.length > 1) {
      return project.images[1]; // Second image may be better
    }
    
    // Dada Rao Danve's project - choose better preview image if available
    if (project.id === 'dada-rao-danve-residence' && project.images.length > 2) {
      return project.images[2]; // Third image may be better
    }
  }
  
  // In a real app, this would analyze images for quality, composition, etc.
  // For now, just return the first image as default
  return project.images[0];
};

/**
 * Ranks project images to determine the best order to display them in
 * 
 * @param project Project object with images array
 * @returns Sorted array of images in optimal display order
 */
export const rankProjectImages = (project: Project): string[] => {
  if (!project || !project.images || project.images.length <= 1) {
    return project.images || [];
  }
  
  // Special case handling for specific projects
  if (project.id === 'mr-samir-ghule-residence' && project.images.length > 2) {
    // For this specific project, we want to show certain images first
    const bestImages = [...project.images];
    // Move the best image to the front
    const bestImageIndex = 1;
    if (bestImageIndex < bestImages.length) {
      const bestImage = bestImages[bestImageIndex];
      bestImages.splice(bestImageIndex, 1);
      bestImages.unshift(bestImage);
    }
    return bestImages;
  }
  
  // Clone the array to avoid mutating the original
  return [...project.images];
};
