
import { Project } from "@/data/projectsData";

interface ImageScore {
  url: string;
  score: number;
}

export const getBestProjectImage = (project: Project): string => {
  if (!project.images || project.images.length === 0) {
    return "";
  }

  // Always use the first image as the hero image
  // This now points to our newly added hero image
  return project.images[0];
};
