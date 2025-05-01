
import { useState, useRef } from "react";
import OptimizedImage from "../OptimizedImage";
import { Link } from "react-router-dom";

interface ProjectThumbnailsProps {
  allImages: string[];
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  title: string;
  id: string;
  showThumbnails: boolean;
}

const ProjectThumbnails = ({ 
  allImages, 
  selectedImageIndex, 
  setSelectedImageIndex, 
  title, 
  id,
  showThumbnails
}: ProjectThumbnailsProps) => {
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  
  // Generate optimized placeholder colors
  const getPlaceholderColor = (idx: number): string => {
    const colors = ['#f5f5f5', '#f0f0f0', '#ebebeb', '#e8e8e8'];
    return colors[idx % colors.length];
  };

  if (!showThumbnails || allImages.length <= 1) {
    return null;
  }

  return (
    <div 
      ref={thumbnailsRef}
      className="mt-3"
    >
      <p className="text-sm text-darkGray mb-2 font-lato relative inline-block">
        Quick Preview
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roseGold/80"></span>
      </p>
      
      <div 
        className="flex gap-2 overflow-x-auto py-2 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allImages.slice(0, 4).map((thumbImg, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              setSelectedImageIndex(idx);
            }}
            className={`flex-shrink-0 w-[80px] h-[60px] rounded-md overflow-hidden transition-all duration-300 
              ${idx === selectedImageIndex ? 'ring-2 ring-roseGold' : 'ring-1 ring-lightGray/30 hover:ring-roseGold/50'}`}
          >
            <OptimizedImage
              src={thumbImg}
              alt={`Thumbnail of ${title}`}
              className="w-full h-full object-cover"
              width={80}
              height={60}
              priority={false}
              preload={idx === 0}
              quality="low"
              placeholderColor={getPlaceholderColor(idx)}
              skipLazyLoading={idx < 2}
            />
          </button>
        ))}
        
        {allImages.length > 4 && (
          <Link 
            to={`/portfolio/${id}`}
            className="flex-shrink-0 w-[80px] h-[60px] rounded-md overflow-hidden bg-darkGray/10 flex items-center justify-center text-darkGray/70 hover:bg-darkGray/20 transition-colors"
          >
            +{allImages.length - 4}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectThumbnails;
