
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
  quality = "medium"
}: ResponsiveImageProps) => {
  // Add performance attributes and hints
  const optimizeImage = () => {
    return {
      decoding: priority ? "sync" as const : "async" as const,
      fetchPriority: fetchPriority,
      loading: loading,
      style: {
        backgroundColor: placeholderColor,
        aspectRatio: `${width}/${height}`,
        objectFit: "contain" as const,
        maxWidth: "100%" as const,
        height: "auto" as const,
        imageRendering: "optimizeQuality" as const,
        // For smaller images on mobile, use pixelated to prevent blurring
        ...(width < 300 && { imageRendering: "pixelated" as const })
      },
      // Explicit image dimensions to prevent layout shifts
      width: width,
      height: height
    };
  };

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onLoad={onLoad}
      {...optimizeImage()}
    />
  );
});

ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;
