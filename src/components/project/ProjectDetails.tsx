import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Project } from "@/data/projectsData";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  // Special styling for specific projects
  const getProjectSpecificStyles = () => {
    if (project.id === "bhushan-naikwadi-elegant-abode") {
      return {
        backgroundPattern: "mandala-pattern-bg bg-opacity-10",
        accentColor: "bg-roseGold/90"
      };
    }
    if (project.id === "grandeur-wedding-hall") {
      return {
        backgroundPattern: "indian-pattern-bg",
        accentColor: "bg-roseGold/90"
      };
    }
    return {
      backgroundPattern: "mandala-pattern-bg",
      accentColor: "bg-roseGold/90"
    };
  };
  
  const { backgroundPattern, accentColor } = getProjectSpecificStyles();
  
  return (
    <section className="bg-warmWhite py-20 md:py-32 px-4 mandala-pattern-bg" style={{ '--bg-color': '#FAF9F6' } as React.CSSProperties}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-playfair text-3xl md:text-4xl mb-8">Project Overview</h2>
              <p className="text-xl mb-12 leading-relaxed">
                {project.description}
              </p>
              
              <h3 className="font-playfair text-2xl mb-6">Design Philosophy</h3>
              <p className="text-lg mb-10 leading-relaxed">
                Our approach to this project focused on creating a harmonious balance between functionality and aesthetic excellence. 
                We embraced the natural elements of the space while introducing architectural elements that reflect the client's unique personality and lifestyle needs.
                {project.id === "grandeur-wedding-hall" && " The design incorporates traditional Indian craftsmanship through ornate woodwork, warm lighting, and carefully selected materials that bring a sense of heritage while creating a luxurious atmosphere perfect for celebrations."}
                {project.id === "bhushan-naikwadi-elegant-abode" && " The design celebrates the rich heritage of Indian craftsmanship through teak wood elements, handwoven textiles, and subtle jali screens that create a perfect harmony of traditional and contemporary aesthetics."}
              </p>
              
              <h3 className="font-playfair text-2xl mb-6">Features</h3>
              <ul className="space-y-4 mb-12">
                {project.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * Math.min(index, 5) }}
                  >
                    <span className="text-roseGold mr-3 text-2xl">•</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <p className="text-roseGold/90 italic text-center mt-16">
                "Our portfolio loads instantly, showcasing spaces you'll love!"
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={`bg-lightGray/30 p-8 rounded-xl sticky top-32 ${backgroundPattern}`}>
              <h3 className="font-playfair text-2xl mb-6">Project Details</h3>
              
              <div className="space-y-6">
                {project.designer && (
                  <div>
                    <p className="text-darkGray/60 text-sm">Designer</p>
                    <p className="font-medium text-lg">{project.designer}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-darkGray/60 text-sm">Category</p>
                  <p className="font-medium text-lg">{project.category}</p>
                </div>
                
                <div>
                  <p className="text-darkGray/60 text-sm">Location</p>
                  <p className="font-medium text-lg">{project.location}</p>
                </div>
                
                <div>
                  <p className="text-darkGray/60 text-sm">Size</p>
                  <p className="font-medium text-lg">{project.size}</p>
                </div>
                
                <div>
                  <p className="text-darkGray/60 text-sm">Completed</p>
                  <p className="font-medium text-lg">{project.completionYear}</p>
                </div>

                {project.style && (
                  <div>
                    <p className="text-darkGray/60 text-sm">Style</p>
                    <p className="font-medium text-lg">{project.style}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-10">
                <Link to="/contact" className="block w-full bg-roseGold text-white text-center px-6 py-4 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
                  Start Your Project
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
