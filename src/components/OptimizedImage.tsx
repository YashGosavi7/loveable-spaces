
import { memo, useRef, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  preload?: boolean;
}

const OptimizedImage = memo(({ 
  src, 
  alt, 
  priority = false,
  className = "",
  width = 800,
  height = 600,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  preload = false
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate tiny placeholder color based on image path
  const placeholderColor = src.includes('f5ee7e6c') ? '#f5f0e6' : 
                           src.includes('09506ceb') ? '#f0e9e4' : 
                           src.includes('cee99868') ? '#f5f5f0' :
                           src.includes('b52db17b') ? '#f0f0e8' :
                           src.includes('0ca6700f') ? '#f8f6f2' :
                           src.includes('5bc6dc7e') ? '#f5f2ed' :
                           src.includes('46f2b2ae') ? '#f2f0eb' :
                           src.includes('6f4bb809') ? '#f0e9e4' : 
                           src.includes('e4e76a6f') ? '#f5f5f5' : '#efefef';

  // Add preload link for critical images
  useEffect(() => {
    if (preload || priority) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.as = 'image';
      linkElement.href = src;
      document.head.appendChild(linkElement);
      
      return () => {
        document.head.removeChild(linkElement);
      };
    }
  }, [src, preload, priority]);

  // Determine if mobile screen for serving correct image size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
  
  // Responsive image sizing
  const getResponsiveImageSrc = (src: string, size: 'small' | 'medium' | 'large' = 'medium') => {
    // In a production environment, you would have different sized versions
    // e.g. appending -small, -medium suffixes to filenames
    return src;
  };

  useEffect(() => {
    // If priority is true, don't use intersection observer - load immediately
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
      { threshold: 0.1, rootMargin: "300px" } // Increased rootMargin for earlier loading
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

  return (
    <>
      {!isLoaded && (
        <div 
          className="absolute inset-0 w-full h-full animate-pulse" 
          style={{ backgroundColor: placeholderColor }}
          aria-hidden="true"
        >
          <Skeleton className="w-full h-full" />
        </div>
      )}
      {(isInView || priority) && (
        <picture>
          {/* WebP format for modern browsers */}
          <source 
            type="image/webp" 
            srcSet={`${getResponsiveImageSrc(src, 'small')} 300w, 
                    ${getResponsiveImageSrc(src, 'medium')} 600w, 
                    ${getResponsiveImageSrc(src, 'large')} 1200w`}
            sizes={sizes}
          />
          {/* Fallback image */}
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

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
