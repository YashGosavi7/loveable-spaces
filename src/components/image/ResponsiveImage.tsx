
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
}

const ResponsiveImage = memo(({ 
  src, 
  alt, 
  className = '',
  width = 800,
  height = 600,
  priority = false,
  onLoad,
  placeholderColor
}: ResponsiveImageProps) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    loading={priority ? "eager" : "lazy"}
    onLoad={onLoad}
    width={width}
    height={height}
    style={{ 
      backgroundColor: placeholderColor,
      aspectRatio: `${width}/${height}` 
    }}
    fetchPriority={priority ? "high" : "auto"}
    decoding={priority ? "sync" : "async"}
  />
));

ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;
