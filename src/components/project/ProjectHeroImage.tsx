
import { useOptimizedImage } from "@/hooks/useOptimizedImage";
import OptimizedImage from "../OptimizedImage";
import { ImageLoader } from "../image/ImageLoader";
import { useEffect } from "react";

interface ProjectHeroImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ProjectHeroImage = ({ src, alt, width, height }: ProjectHeroImageProps) => {
  const { isLoaded, handleImageLoad, placeholderColor } = useOptimizedImage({
    src,
    priority: true,
    preload: true
  });

  // Enhanced preloading strategy for hero image with multiple formats and responsive sizes
  useEffect(() => {
    if (!document.querySelector(`link[rel="preload"][href="${src}"]`) && typeof window !== 'undefined') {
      // Create preload link for WebP format
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = src;
      preloadLink.type = 'image/webp'; // Prefer WebP for modern browsers
      preloadLink.setAttribute('fetchpriority', 'high');
      document.head.appendChild(preloadLink);

      // Add media attribute for responsive preloading
      if (width <= 768) {
        preloadLink.setAttribute('media', '(max-width: 768px)');
      }

      // Add cache control hints for CDN optimization
      preloadLink.setAttribute('data-cache-control', 'public, max-age=31536000, immutable');
      
      return () => {
        try {
          document.head.removeChild(preloadLink);
        } catch (e) {
          // Ignore errors if element is already removed
        }
      };
    }
  }, [src, width]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{ 
          backgroundColor: placeholderColor,
          opacity: isLoaded ? 0 : 1 
        }}
        aria-hidden="true"
      />
      
      {/* Use ImageLoader component to show loading state */}
      {!isLoaded && (
        <ImageLoader color={placeholderColor} showSpinner size="large" />
      )}
      
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover" 
        priority={true}
        width={width}
        height={height}
        preload={true}
        onLoad={handleImageLoad}
        format="auto" // Auto-selects optimal format (WebP/AVIF with JPEG fallback)
        sizes="100vw" // Hero image takes full viewport width
        quality="high" // Use high quality for hero images
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
    </div>
  );
};

export default ProjectHeroImage;
