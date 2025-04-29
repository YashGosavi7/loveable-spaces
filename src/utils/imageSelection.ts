
import { Project } from "@/data/projectsData";

interface ImageScore {
  url: string;
  score: number;
}

// Get the best project image based on various factors
export const getBestProjectImage = (project: Project): string => {
  if (!project.images || project.images.length === 0) {
    console.warn(`No images found for project: ${project.id}`);
    return "/placeholder.svg";
  }

  // For Bopdev Machi project, prefer the front facade view as the main image
  if (project.id === "bopdev-machi") {
    // First check if we have the new facade images
    const facadeImages = project.images.filter(url => url.includes("cca9f027") || url.includes("4883b78f"));
    if (facadeImages.length > 0) {
      return facadeImages[0]; // Return the first facade image
    }
    return project.images[0]; // Fallback to the first image
  }

  // If there's only one image, return it
  if (project.images.length === 1) {
    return project.images[0];
  }

  // Score each image and pick the one with the highest score
  const scoredImages: ImageScore[] = project.images.map((url) => {
    let score = 0;

    // Filename-based scoring
    const filename = url.split('/').pop()?.toLowerCase() || '';
    
    // Prefer images with "main", "cover", "hero", "featured" in the filename
    if (filename.includes('main')) score += 5;
    if (filename.includes('cover')) score += 5;
    if (filename.includes('hero')) score += 5;
    if (filename.includes('featured')) score += 4;
    
    // Prefer images with project name in filename
    const projectNameWords = project.title.toLowerCase().split(' ');
    for (const word of projectNameWords) {
      if (word.length > 2 && filename.includes(word)) {
        score += 2;
      }
    }
    
    // Position-based heuristic - first images are often better
    const position = project.images.indexOf(url);
    score += Math.max(0, 3 - position);
    
    return { url, score };
  });

  // Get the image with the highest score
  scoredImages.sort((a, b) => b.score - a.score);
  console.log(`Scored images for ${project.id}:`, 
    scoredImages.map(img => ({ url: img.url.split('/').pop(), score: img.score }))
  );
  
  return scoredImages[0].url;
};
