
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
  quality?: "low" | "medium" | "high";
  blurHash?: string;
  skipLazyLoading?: boolean;
}

const OptimizedImage = memo(({ 
  src, 
  alt, 
  priority = false,
  className = "",
  width = 800,
  height = 600,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  preload = false,
  quality = "medium",
  blurHash,
  skipLazyLoading = false
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || skipLazyLoading);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Generate color placeholder based on image path for better UX while loading
  const generatePlaceholderColor = () => {
    // Naikwadi project placeholders
    if (src.includes('7a9b0e2f')) return '#f5f1ea'; // Living room
    if (src.includes('59d47f06')) return '#f4efe8'; // Bedroom with mandalas
    if (src.includes('94247c8f')) return '#f5f0e9'; // Bedroom alternative angle
    if (src.includes('33bf1683')) return '#f3ede6'; // Bedroom storage
    if (src.includes('5d5e5726')) return '#f4efe7'; // Bedroom side view
    if (src.includes('8ebf3bc3')) return '#f5f0e8'; // Entrance
    if (src.includes('3914b6c6')) return '#f2ede5'; // TV Unit
    if (src.includes('88614b3e')) return '#f5f1ea'; // Dining area
    if (src.includes('cc7886ad')) return '#f4efe7'; // Living space

    // Wedding hall placeholders
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

  // Enhanced image path formatting for theoretically variable sizes
  // In production this would connect to a proper image CDN
  const getImageUrl = (imgPath: string, imgWidth: number, format: string = 'auto') => {
    // In production, this would be handled by an image processing service
    // For example: return `https://cdn.loveable.com/img/${imgWidth}/${format}/${imgPath}`
    return imgPath;
  };

  // Add preload link for critical images to speed up loading time
  useEffect(() => {
    if ((preload || priority) && typeof window !== 'undefined') {
      const linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.as = 'image';
      linkElement.href = src;
      
      // Use lowercase attribute to avoid React warning
      linkElement.setAttribute('fetchpriority', priority ? 'high' : 'auto');
      
      // Use smaller images when appropriate
      const isMobile = window.innerWidth < 768;
      if (isMobile && width > 400) {
        // Append a size indicator for hypothetical image resizing service
        // In production, this would connect to an image CDN
        linkElement.href = getImageUrl(src, Math.floor(width/2));
      }
      
      document.head.appendChild(linkElement);
      
      // Add cache control headers (this would be on server-side in production)
      linkElement.setAttribute('data-cache-control', 'public, max-age=5184000'); // 60 days
      
      return () => {
        try {
          document.head.removeChild(linkElement);
        } catch (e) {
          // Link element might have already been removed
          console.info('Preload link already removed');
        }
      };
    }
  }, [src, preload, priority, width]);

  // Get responsive image source for different device sizes
  const getResponsiveImageSrc = (src: string, size: 'small' | 'medium' | 'large' = 'medium') => {
    // In a production environment, we would have a proper image CDN
    // that could dynamically resize images based on query parameters
    let targetWidth = width;
    
    if (size === 'small') {
      targetWidth = Math.min(250, width); // Mobile sizes
    } else if (size === 'medium') {
      targetWidth = Math.min(500, width); // Tablet sizes
    } else if (size === 'large') {
      targetWidth = width; // Desktop sizes
    }
    
    return getImageUrl(src, targetWidth);
  };
  
  // Enhanced intersection observer with much earlier detection
  useEffect(() => {
    // If priority is true, don't use intersection observer - load immediately
    if (priority || skipLazyLoading) {
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
        threshold: 0.01, // Reduced threshold to start loading when just 1% visible
        rootMargin: "800px 0px" // Increased rootMargin significantly to load images well before they enter viewport
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
  }, [priority, skipLazyLoading]);

  // Define quality parameters for different quality settings
  const getQualitySuffix = () => {
    // In production this would be used with a CDN
    switch(quality) {
      case 'low': return '&q=60';
      case 'high': return '&q=90';
      default: return '&q=75';
    }
  };

  return (
    <>
      {!isLoaded && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: placeholderColor }}
          aria-hidden="true"
        >
          <Skeleton className="w-full h-full opacity-30" />
        </div>
      )}
      
      {(isInView) && (
        <picture>
          {/* WebP format for modern browsers */}
          <source 
            type="image/webp" 
            srcSet={`${getResponsiveImageSrc(src, 'small')} 250w, 
                    ${getResponsiveImageSrc(src, 'medium')} 500w, 
                    ${getResponsiveImageSrc(src, 'large')} ${width}w`}
            sizes={sizes}
          />
          
          {/* AVIF format for browsers with the best compression support */}
          <source 
            type="image/avif" 
            srcSet={`${getResponsiveImageSrc(src, 'small')} 250w, 
                    ${getResponsiveImageSrc(src, 'medium')} 500w, 
                    ${getResponsiveImageSrc(src, 'large')} ${width}w`}
            sizes={sizes}
          />
          
          {/* Responsive sources for different devices */}
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
            // Corrected to camelCase fetchPriority
            fetchPriority={priority ? "high" : "auto"}
            style={{
              aspectRatio: `${width}/${height}`,
              objectFit: "cover"
            }}
          />
        </picture>
      )}

      {/* Hidden image for prefetching next gallery images */}
      {!isInView && preload && (
        <link 
          rel="prefetch" 
          href={src} 
          as="image" 
          // Use setAttribute to avoid React warnings
          data-fetchpriority="low"
        />
      )}
    </>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
