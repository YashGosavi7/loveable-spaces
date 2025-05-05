
import { motion } from "framer-motion";
import { Project } from "@/data/projectsData";

interface ProjectHeroInfoProps {
  project: Project;
}

const ProjectHeroInfo = ({ project }: ProjectHeroInfoProps) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-end">
      <div className="container mx-auto p-8 md:p-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/90 text-xl md:text-2xl">
            {project.category} | {project.location}
            {project.designer && ` | Designed by ${project.designer}`}
          </p>
          {project.tagline && (
            <p className="text-roseGold/90 text-xl mt-3 italic">
              {project.tagline}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectHeroInfo;
