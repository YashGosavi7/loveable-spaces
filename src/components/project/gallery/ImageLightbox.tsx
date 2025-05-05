
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const ImageLightbox = ({ images, initialIndex, onClose, onIndexChange }: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  // Preload surrounding images for faster navigation
  useEffect(() => {
    const preloadNextAndPrev = () => {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      const nextIndex = (currentIndex + 1) % images.length;
      
      const preloadImage = (index: number) => {
        const img = new Image();
        img.src = images[index];
        img.fetchPriority = "high";
        img.decoding = "async";
      };
      
      preloadImage(prevIndex);
      preloadImage(nextIndex);
    };
    
    preloadNextAndPrev();
  }, [currentIndex, images]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        navigatePrev();
      } else if (e.key === "ArrowRight") {
        navigateNext();
      } else if (e.key === " " || e.key === "Enter") {
        setIsZoomed(!isZoomed);
        e.preventDefault();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Restore scrolling
    };
  }, [isZoomed, onClose]);

  const navigateNext = useCallback(() => {
    setIsLoading(true);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    onIndexChange(nextIndex);
  }, [currentIndex, images.length, onIndexChange]);

  const navigatePrev = useCallback(() => {
    setIsLoading(true);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    onIndexChange(prevIndex);
  }, [currentIndex, images.length, onIndexChange]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Handle touch/swipe gestures
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left - go to next
      navigateNext();
    } else if (touchStart - touchEnd < -100) {
      // Swipe right - go to previous
      navigatePrev();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        className="absolute top-4 right-4 text-white/90 hover:text-white z-10 p-2"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white/90 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
      
      {/* Previous button */}
      <button
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-full z-10"
        onClick={(e) => {
          e.stopPropagation();
          navigatePrev();
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      
      {/* Next button */}
      <button
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-full z-10"
        onClick={(e) => {
          e.stopPropagation();
          navigateNext();
        }}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Image container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          toggleZoom();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-roseGold/30 border-t-roseGold rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* The image */}
        <img 
          src={images[currentIndex]} 
          alt={`Full-size image ${currentIndex + 1}`}
          className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          style={{ transform: isZoomed ? 'scale(1.5)' : 'none' }}
          onLoad={handleImageLoad}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          decoding="async"
        />
        
        {/* Zoom instructions */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm 
                        transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
          Click image to zoom
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
