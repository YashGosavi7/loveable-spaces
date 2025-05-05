import { Project } from "@/data/projectsData";
import { useState, useEffect } from "react";

interface ProjectHeroInfoProps {
  project: Project;
}

const ProjectHeroInfo = ({ project }: ProjectHeroInfoProps) => {
  // State to determine if we should show the overlay info
  const [showInfo, setShowInfo] = useState(false);

  // Set the initial state based on user preferences
  useEffect(() => {
    // Default to hidden
    setShowInfo(false);
  }, []);

  // If we decided not to show info, don't render anything
  if (!showInfo) {
    return null;
  }

  // Otherwise, show the original overlay
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white p-4 md:p-6 backdrop-blur-sm bg-darkGray/30 rounded-lg max-w-xl">
        <p className="font-playfair text-xl md:text-2xl mb-2 text-roseGold">
          {project.category} | {project.location}
        </p>
        {project.tagline && (
          <p className="text-lg md:text-xl italic text-white/90">{project.tagline}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectHeroInfo;
