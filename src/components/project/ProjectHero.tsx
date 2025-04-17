
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from "../OptimizedImage";
import { Helmet } from "react-helmet";
import { Project } from "@/data/projectsData";

interface ProjectHeroProps {
  project: Project;
  activeImageIndex: number;
  prevImage: () => void;
  nextImage: () => void;
}

const ProjectHero = ({ project, activeImageIndex, prevImage, nextImage }: ProjectHeroProps) => {
  return (
    <section className="w-full h-[100vh] relative">
      <Helmet>
        <title>Loveable - {project.title} Interior Design</title>
        <meta name="description" content={`Explore the warm, elegant interiors of ${project.title} in ${project.location} by Loveable, designed with Indian craftsmanship.`} />
        <meta property="og:title" content={`Loveable - ${project.title} Interior Design`} />
        <meta property="og:description" content={`Explore the warm, elegant interiors of ${project.title} in ${project.location} by Loveable, designed with Indian craftsmanship.`} />
        <meta property="og:image" content={project.images[0]} />
      </Helmet>
      
      <div className="absolute inset-0">
        <OptimizedImage 
          src={project.images[activeImageIndex]} 
          alt={`${project.title} - Interior design by Loveable in ${project.location}`} 
          className="w-full h-full object-cover"
          priority={true}
          width={1200}
          height={675}
          preload={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-end">
          <div className="container mx-auto p-8 md:p-16 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                {project.title}
              </h1>
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
        
        {/* Navigation arrows */}
        <button 
          className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 bg-black/30 hover:bg-black/60 transition-colors p-3 md:p-4 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-roseGold/50"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 bg-black/30 hover:bg-black/60 transition-colors p-3 md:p-4 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-roseGold/50"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default ProjectHero;
