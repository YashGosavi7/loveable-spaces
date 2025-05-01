
import { useState } from "react";
import { GalleryThumbnails } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import OptimizedImage from "../OptimizedImage";

interface ProjectCardImageProps {
  displayImage: string;
  title: string;
  location: string;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  index: number;
  allImages: string[];
}

const ProjectCardImage = ({
  displayImage,
  title,
  location,
  imageLoaded,
  setImageLoaded,
  index,
  allImages
}: ProjectCardImageProps) => {
  // Generate optimized placeholder colors
  const getPlaceholderColor = (idx: number): string => {
    const colors = ['#f5f5f5', '#f0f0f0', '#ebebeb', '#e8e8e8'];
    return colors[idx % colors.length];
  };

  // Lazy loading strategy based on priority
  const shouldUseEagerLoading = index < 3;

  return (
    <div className="overflow-hidden rounded-md shadow-md border border-roseGold/10">
      <AspectRatio ratio={4/3} className="bg-lightGray/20 w-full">
        {!imageLoaded && (
          <Skeleton className="w-full h-full absolute inset-0" />
        )}
        <OptimizedImage
          src={displayImage}
          alt={`${title} interior in ${location}`}
          className="w-full h-full object-cover"
          width={400}
          height={300}
          priority={index < 3}
          preload={index < 6}
          quality={index < 3 ? "high" : "medium"}
          onLoad={() => setImageLoaded(true)}
          placeholderColor={getPlaceholderColor(index)}
        />
      </AspectRatio>
      
      {/* Show image count indicator if there are multiple images */}
      {allImages.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <GalleryThumbnails size={12} />
          <span>{allImages.length}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectCardImage;
