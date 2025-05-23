
import { Project } from "@/data/projectsData";
import { getOptimalImageDimensions, TEAM_MEMBER_IMAGES } from "./imageUtils";
import { preloadImages } from "./imagePreloader";

interface ImageScore {
  url: string;
  score: number;
  reason: string;
}

export const getBestProjectImage = (project: Project, context: 'hero' | 'card' | 'thumbnail' = 'card'): string => {
  if (!project.images || project.images.length === 0) {
    return "";
  }

  // If there's only one image, use it and preload it
  if (project.images.length === 1) {
    const image = project.images[0];
    // Trigger aggressive preloading for single images
    if (typeof window !== 'undefined') {
      preloadImages([image], 'critical');
    }
    return image;
  }

  // Score images based on various factors for better selection
  const scoredImages: ImageScore[] = project.images.map((url, index) => {
    let score = 0;
    let reason = '';

    // Prioritize first few images (usually best quality)
    if (index === 0) {
      score += 50;
      reason += 'first-image ';
    } else if (index === 1) {
      score += 30;
      reason += 'second-image ';
    }

    // Boost score for team member images (they're already optimized)
    if (TEAM_MEMBER_IMAGES.includes(url)) {
      score += 100;
      reason += 'team-member ';
    }

    // Prefer images that look like hero/main images based on filename patterns
    if (url.includes('hero') || url.includes('main') || url.includes('featured')) {
      score += 40;
      reason += 'hero-pattern ';
    }

    // Slightly prefer images with certain characteristics in URL
    if (url.includes('living') || url.includes('dining') || url.includes('bedroom')) {
      score += 20;
      reason += 'room-type ';
    }

    // For thumbnails, prefer later images to add variety
    if (context === 'thumbnail' && index > 2) {
      score += 15;
      reason += 'variety ';
    }

    return { url, score, reason: reason.trim() };
  });

  // Sort by score and get the best image
  scoredImages.sort((a, b) => b.score - a.score);
  const bestImage = scoredImages[0];

  // Aggressive preloading strategy based on context
  if (typeof window !== 'undefined') {
    const imagesToPreload = [bestImage.url];
    
    // For hero context, preload the top 3 images
    if (context === 'hero') {
      imagesToPreload.push(...scoredImages.slice(1, 3).map(img => img.url));
      preloadImages(imagesToPreload, 'critical');
    } 
    // For card context, preload the best image and one backup
    else if (context === 'card') {
      if (scoredImages.length > 1) {
        imagesToPreload.push(scoredImages[1].url);
      }
      preloadImages(imagesToPreload, 'high');
    }
    // For thumbnails, just preload the selected image
    else {
      preloadImages(imagesToPreload, 'medium');
    }
  }

  console.log(`Selected image for ${project.title} (${context}):`, {
    selected: bestImage.url,
    score: bestImage.score,
    reason: bestImage.reason
  });

  return bestImage.url;
};

// Enhanced function to get multiple optimized images for a project
export const getProjectImageSet = (project: Project, count: number = 3): string[] => {
  if (!project.images || project.images.length === 0) {
    return [];
  }

  // If requesting more images than available, return all
  if (count >= project.images.length) {
    // Preload all images for smooth experience
    if (typeof window !== 'undefined') {
      preloadImages(project.images, 'high');
    }
    return project.images;
  }

  // Use the scoring system to get the best images
  const scoredImages = project.images.map((url, index) => {
    let score = 0;

    // Prioritize variety in the set
    if (index === 0) score += 50; // Always include first
    if (index === Math.floor(project.images.length / 2)) score += 30; // Middle image
    if (index === project.images.length - 1) score += 20; // Last image
    
    // Boost team member images
    if (TEAM_MEMBER_IMAGES.includes(url)) score += 100;
    
    // Prefer images with descriptive names
    if (url.includes('living') || url.includes('dining') || url.includes('bedroom') || 
        url.includes('kitchen') || url.includes('bathroom')) {
      score += 25;
    }

    return { url, score, index };
  });

  // Sort and take the top count
  const selectedImages = scoredImages
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .sort((a, b) => a.index - b.index) // Restore original order
    .map(img => img.url);

  // Preload the selected images
  if (typeof window !== 'undefined') {
    preloadImages(selectedImages, 'high');
  }

  return selectedImages;
};

// Function to prefetch images for a specific project when user hovers or focuses
export const prefetchProjectImages = (project: Project) => {
  if (!project.images || typeof window === 'undefined') return;

  // Prefetch the best image and a few others
  const imagesToPrefetch = getProjectImageSet(project, 5);
  preloadImages(imagesToPrefetch, 'medium');
};
