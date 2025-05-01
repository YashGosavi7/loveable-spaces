
/**
 * Selects the best image for a project preview based on various factors
 * 
 * @param images Array of project images
 * @returns The URL of the best image to use
 */
export const getBestProjectImage = (images: string[]): string => {
  // If there are no images, return a placeholder
  if (!images || images.length === 0) {
    return '/placeholder.svg';
  }
  
  // In a real app, this would analyze images for quality, composition, etc.
  // For now, just return the first image as default
  return images[0];
};

/**
 * Ranks project images to determine the best order to display them in
 * 
 * @param images Array of project images
 * @returns Sorted array of images in optimal display order
 */
export const rankProjectImages = (images: string[]): string[] => {
  if (!images || images.length <= 1) {
    return images;
  }
  
  // Clone the array to avoid mutating the original
  return [...images];
};
