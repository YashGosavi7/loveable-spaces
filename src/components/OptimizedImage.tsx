
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

  // Generate a color placeholder based on image path for better UX while loading
  const generatePlaceholderColor = () => {
    if (src.includes('eea53347')) return '#f5f0e9'; // Wedding hall main
    if (src.includes('18ae3aa6')) return '#f3ede6'; // Wedding hall seating
    if (src.includes('76be1317')) return '#f4efe8'; // Wedding hall walkway
    if (src.includes('ca4507e9')) return '#f2ede5'; // Wedding hall mandap
    if (src.includes('40a33995')) return '#f5f1ea'; // Wedding hall chandelier
    if (src.includes('c9e93dc4')) return '#f4efe7'; // Wedding hall entrance
    if (src.includes('de461583')) return '#f3eee7'; // Wedding hall stage
    if (src.includes('ac8a7286')) return '#f5f0e8'; // Wedding hall reception
    if (src.includes('e6e7be2a')) return '#f4efe7'; // Wedding hall overview
    
    // Original placeholders for existing images
    if (src.includes('f5ee7e6c')) return '#f5f0e6';
    if (src.includes('09506ceb')) return '#f0e9e4';
    if (src.includes('cee99868')) return '#f5f5f0';
    if (src.includes('b52db17b')) return '#f0f0e8';
    if (src.includes('0ca6700f')) return '#f8f6f2';
    if (src.includes('5bc6dc7e')) return '#f5f2ed';
    if (src.includes('46f2b2ae')) return '#f2f0eb';
    if (src.includes('6f4bb809')) return '#f0e9e4';
    if (src.includes('e4e76a6f')) return '#f5f5f5';
    
    // Default placeholder color
    return '#f5f2ed';
  };

  const placeholderColor = generatePlaceholderColor();

  // Add preload link for critical images to speed up loading time
  useEffect(() => {
    if (preload || priority) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.as = 'image';
      linkElement.href = src;
      
      // Add fetchpriority attribute for browsers that support it
      linkElement.setAttribute('fetchpriority', priority ? 'high' : 'auto');
      
      document.head.appendChild(linkElement);
      
      return () => {
        document.head.removeChild(linkElement);
      };
    }
  }, [src, preload, priority]);

  // Determine viewport size for responsive images
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
  
  // Get responsive image source for different device sizes
  const getResponsiveImageSrc = (src: string, size: 'small' | 'medium' | 'large' = 'medium') => {
    // In a production environment, we would have a proper image CDN
    // that could dynamically resize images based on query parameters
    return src;
  };

  // Use Intersection Observer to lazy load images
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
      { 
        threshold: 0.1, 
        rootMargin: "400px" // Increased rootMargin to load images earlier before they enter viewport
      }
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
          <Skeleton className="w-full h-full opacity-40" />
        </div>
      )}
      
      {(isInView || priority) && (
        <picture>
          {/* WebP format for modern browsers - in production these would be proper WebP conversions */}
          <source 
            type="image/webp" 
            srcSet={`${getResponsiveImageSrc(src, 'small')} 300w, 
                    ${getResponsiveImageSrc(src, 'medium')} 600w, 
                    ${getResponsiveImageSrc(src, 'large')} 1200w`}
            sizes={sizes}
          />
          
          {/* Responsive images for different devices */}
          <source 
            media="(max-width: 640px)" 
            srcSet={getResponsiveImageSrc(src, 'small')}
          />
          <source 
            media="(max-width: 1024px)" 
            srcSet={getResponsiveImageSrc(src, 'medium')}
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
