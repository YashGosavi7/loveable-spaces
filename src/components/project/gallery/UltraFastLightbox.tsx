
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import UltraFastPicture from '@/components/image/UltraFastPicture';
import { ultraFastPreload } from '@/utils/ultraFastImageOptimization';

interface UltraFastLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

const UltraFastLightbox = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  onIndexChange
}: UltraFastLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Ultra-aggressive preloading for lightbox images
  useEffect(() => {
    if (isOpen) {
      // Preload current and adjacent images immediately
      const preloadIndices = [
        currentIndex - 2,
        currentIndex - 1,
        currentIndex,
        currentIndex + 1,
        currentIndex + 2
      ].filter(i => i >= 0 && i < images.length);
      
      const imagesToPreload = preloadIndices.map(i => images[i]);
      ultraFastPreload(imagesToPreload, 'lightbox', 'critical');
      
      // Preload all remaining images in background
      setTimeout(() => {
        const remainingImages = images.filter((_, i) => !preloadIndices.includes(i));
        ultraFastPreload(remainingImages, 'lightbox', 'medium');
      }, 100);
    }
  }, [isOpen, currentIndex, images]);
  
  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [currentIndex, images.length, onIndexChange]);
  
  const handleNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [currentIndex, images.length, onIndexChange]);
  
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          onClose();
          break;
        case 'z':
        case 'Z':
          setIsZoomed(!isZoomed);
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrevious, handleNext, onClose, isZoomed]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close lightbox"
      >
        <X size={24} className="text-white" />
      </button>
      
      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={24} className="text-white" />
      </button>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <ZoomOut size={20} className="text-white" /> : <ZoomIn size={20} className="text-white" />}
        </button>
      </div>
      
      {/* Image counter */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-white/10 rounded-full text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
      
      {/* Main image */}
      <div 
        className={`relative max-w-[90vw] max-h-[90vh] transition-transform duration-300 ${
          isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <UltraFastPicture
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          type="lightbox"
          className="w-full h-full object-contain"
          width={1800}
          height={1200}
          priority
          loading="eager"
        />
      </div>
    </div>
  );
};

export default UltraFastLightbox;
