
import { memo, useRef, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";

const OptimizedImage = memo(({ 
  src, 
  alt, 
  priority = false,
  className = "",
  width = 800,
  height = 600,
  preload = false,
  skipLazyLoading = false
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || skipLazyLoading);
  const imgRef = useRef<HTMLDivElement>(null);
  
  useImagePreload(src, { priority, preload, width });
  
  // Enhanced intersection observer with earlier detection
  useEffect(() => {
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
        threshold: 0.01,
        rootMargin: "800px 0px"
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

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className="relative">
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full opacity-30" />
        </div>
      )}
      
      {isInView && (
        <PictureElement
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
