
import { memo } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  placeholderColor: string;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "eager" | "lazy";
  quality?: "low" | "medium" | "high";
  decoding?: "sync" | "async" | "auto";
}

const ResponsiveImage = memo(({ 
  src, 
  alt, 
  className = '',
  width = 800,
  height = 600,
  priority = false,
  onLoad,
  placeholderColor,
  fetchPriority = "auto",
  loading = "lazy",
  quality = "medium",
  decoding = "async"
}: ResponsiveImageProps) => {
  // Add performance attributes and hints
  const optimizeImage = () => {
    return {
      decoding: decoding,
      loading: loading,
      style: {
        backgroundColor: placeholderColor,
        aspectRatio: `${width}/${height}`,
        objectFit: "cover" as const,
        objectPosition: "center" as const,
        maxWidth: "100%" as const,
        height: "100%" as const,
        imageRendering: "optimizeQuality" as const,
        // For smaller images on mobile, use pixelated to prevent blurring
        ...(width < 300 && { imageRendering: "pixelated" as const })
      },
      // Explicit image dimensions to prevent layout shifts
      width: width,
      height: height,
    };
  };

  // Determine if this is likely a hero image based on dimensions or filename
  const isHeroImage = width >= 1000 || src.includes('hero') || src.includes('main');
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onLoad={onLoad}
      data-fetchpriority={fetchPriority}
      // Add crossorigin attribute to improve CDN caching and CORS support
      crossOrigin="anonymous"
      // Set content importance for browser resource prioritization
      importance={isHeroImage ? "high" : "auto"}
      {...optimizeImage()}
    />
  );
});

ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;
