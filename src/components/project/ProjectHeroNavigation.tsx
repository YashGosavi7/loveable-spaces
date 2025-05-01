
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectHeroNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

const ProjectHeroNavigation = ({ onPrev, onNext }: ProjectHeroNavigationProps) => {
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
    </>
  );
};

export default ProjectHeroNavigation;
