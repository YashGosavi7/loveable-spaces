
import { memo, useRef, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const OptimizedImage = memo(({ 
  src, 
  alt, 
  priority = false,
  className = "",
  width = 800,
  height = 600
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Format for responsive image sources with WebP
  const getResponsiveImageSrc = (src: string, size: 'small' | 'medium' | 'large' = 'medium') => {
    // This is a placeholder - in a real implementation, you would have
    // different size versions of the image on your server
    return src;
  };

  useEffect(() => {
    // If priority is true, don't use intersection observer
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  // Generate a tiny placeholder color from the image path (just for demo purposes)
  const placeholderColor = src.includes('6f4bb809') ? '#f0e9e4' : 
                           src.includes('e4e76a6f') ? '#f5f5f5' : '#efefef';

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 w-full h-full animate-pulse" style={{ backgroundColor: placeholderColor }}>
          <Skeleton className="w-full h-full" />
        </div>
      )}
      {(isInView || priority) && (
        <picture>
          {/* WebP format - better compression, smaller file size */}
          <source 
            type="image/webp" 
            srcSet={`${getResponsiveImageSrc(src, 'small')} 300w, 
                    ${getResponsiveImageSrc(src, 'medium')} 600w, 
                    ${getResponsiveImageSrc(src, 'large')} 1200w`} 
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px"
          />
          {/* Fallback for browsers that don't support WebP */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            onLoad={() => setIsLoaded(true)}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            width={width}
            height={height}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
          />
        </picture>
      )}
    </>
  );
});

export default OptimizedImage;
