/**
 * Select the most optimal image for a project based on its order and importance
 * @param project The project object with images array
 * @returns The best image URL to show as primary
 */
export const getBestProjectImage = (project: Project): string => {
  // If there are no images, return an empty string
  if (!project.images || project.images.length === 0) {
    console.warn(`Project ${project.id} has no images`);
    return '';
  }
  
  // For better performance, select the first image by default
  return project.images[0];
};

/**
 * Preload high-priority images for faster rendering
 * @param projectIds Array of project IDs to prioritize 
 */
export const preloadHighPriorityProjectImages = (projectIds: string[]) => {
  if (typeof document === 'undefined') return;
  
  // Skip if we're on a slow connection
  if ('connection' in navigator && (navigator as any).connection?.saveData) {
    console.log('Save data mode detected, skipping image preloads');
    return;
  }
  
  // Import projects data
  import('../data/projectsData').then(({ default: projectsData }) => {
    // Only preload a limited number of images to avoid network congestion
    const highPriorityProjects = projectsData
      .filter(project => projectIds.includes(project.id))
      .slice(0, 3); // Only preload top 3 projects
    
    highPriorityProjects.forEach(project => {
      if (project.images && project.images.length > 0) {
        // Create a hidden image element to trigger preload
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = project.images[0];
        preloadLink.fetchPriority = 'high';
        document.head.appendChild(preloadLink);
      }
    });
  });
};
