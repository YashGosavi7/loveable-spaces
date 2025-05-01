
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectHeroNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
}

const ProjectHeroNavigation = ({ 
  onPrev, 
  onNext, 
  currentIndex, 
  totalImages 
}: ProjectHeroNavigationProps) => {
  return (
    <>
      <button 
        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 bg-black/30 hover:bg-black/60 transition-colors p-3 md:p-4 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-roseGold/50"
        onClick={onPrev}
        aria-label="Previous image"
      >
        <ArrowLeft size={24} />
      </button>
      
      <button 
        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 bg-black/30 hover:bg-black/60 transition-colors p-3 md:p-4 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-roseGold/50"
        onClick={onNext}
        aria-label="Next image"
      >
        <ArrowRight size={24} />
      </button>
      
      {/* Image counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm md:text-base">
        <span className="sr-only">Image</span> {currentIndex + 1} <span aria-hidden="true">/</span> <span className="sr-only">of</span> {totalImages}
      </div>
    </>
  );
};

export default ProjectHeroNavigation;
