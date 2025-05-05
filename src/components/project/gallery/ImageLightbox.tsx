import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { motion, AnimatePresence } from 'framer-motion';
import { useOptimizedImage } from '@/hooks/useOptimizedImage';
import { useSwipeable } from '@/hooks/useSwipe';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

const ImageLightbox = ({ images, initialIndex = 0, onClose, onIndexChange }: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const { placeholderColor } = useOptimizedImage({ src: images[currentIndex] });
  
  // Preload adjacent images
  useEffect(() => {
    const preloadImages = (indexesToLoad: number[]) => {
      indexesToLoad.forEach(index => {
        if (index >= 0 && index < images.length) {
          const img = new Image();
          img.src = images[index];
        }
      });
    };
    
    // Preload adjacent images - current, next and previous
    const preloadIndices = [currentIndex, currentIndex + 1, currentIndex - 1];
    preloadImages(preloadIndices);
    
    return () => {
      // Nothing to clean up
    };
  }, [currentIndex, images]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') handlePrevious();
      else if (e.key === 'ArrowRight') handleNext();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, images.length]);
  
  // Handle navigation
  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
    setIsLoading(true);
    setIsZoomed(false);
  }, [currentIndex, images.length, onIndexChange]);
  
  const handlePrevious = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
    setIsLoading(true);
    setIsZoomed(false);
  }, [currentIndex, images.length, onIndexChange]);
  
  // Handle swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });
  
  // Get optimal dimensions for the displayed image
  const getImageDimensions = () => {
    let width = 1600;
    let height = 1200;
    
    if (typeof window !== 'undefined') {
      // Adjust based on screen size
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Keep within 80% of viewport
      width = Math.min(width, viewportWidth * 0.8);
      height = Math.min(height, viewportHeight * 0.8);
    }
    
    return { width, height };
  };
  
  const { width, height } = getImageDimensions();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        className="absolute top-4 right-4 z-50 text-white hover:text-roseGold transition-colors p-2 rounded-full bg-black/40 hover:bg-black/60"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      
      {/* Zoom controls */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <button 
          className={`text-white hover:text-roseGold transition-colors p-2 rounded-full bg-black/40 hover:bg-black/60 ${isZoomed ? 'opacity-50' : 'opacity-100'}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
        >
          {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
        </button>
      </div>
      
      {/* Previous button */}
      <button 
        className="absolute left-4 z-50 text-white hover:text-roseGold transition-colors p-2 rounded-full bg-black/40 hover:bg-black/60"
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
      >
        <ChevronLeft size={32} />
      </button>
      
      {/* Next button */}
      <button 
        className="absolute right-4 z-50 text-white hover:text-roseGold transition-colors p-2 rounded-full bg-black/40 hover:bg-black/60"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
      >
        <ChevronRight size={32} />
      </button>
      
      {/* Main image container */}
      <div 
        className="w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        {...swipeHandlers}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div 
              className={`transition-transform duration-300 ${
                isZoomed ? 'scale-150 md:scale-175' : 'scale-100'
              }`}
            >
              {isLoading && (
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: placeholderColor }}
                >
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <OptimizedImage
                src={images[currentIndex]}
                alt={`Project image ${currentIndex + 1}`}
                width={width}
                height={height}
                className="max-w-[80vw] max-h-[80vh] object-contain"
                priority={true}
                quality="high"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 px-4 py-2 rounded-full text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
};

export default ImageLightbox;
