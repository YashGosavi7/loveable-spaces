
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import projectsData from "../data/projectsData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const project = projectsData.find(p => p.id === projectId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 section-padding">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-3xl mb-6">Project Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the project you're looking for</p>
          <Link to="/portfolio" className="btn-primary">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }
  
  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const scrollToThumbnail = (index: number) => {
    if (scrollContainerRef.current) {
      const thumbnails = scrollContainerRef.current.querySelectorAll(".thumbnail");
      if (thumbnails[index]) {
        // Cast the element to HTMLElement which has offsetLeft property
        const thumbnail = thumbnails[index] as HTMLElement;
        const container = scrollContainerRef.current;
        const scrollLeft = thumbnail.offsetLeft - (container.clientWidth - thumbnail.clientWidth) / 2;
        
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        });
      }
    }
  };
  
  useEffect(() => {
    scrollToThumbnail(activeImageIndex);
  }, [activeImageIndex]);
  
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Full-width Hero Image */}
      <section className="w-full h-[100vh] relative">
        <div className="absolute inset-0">
          <img 
            src={project.images[activeImageIndex]} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-end">
            <div className="container mx-auto p-8 md:p-16 pb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-white/80 text-xl md:text-2xl">
                  {project.category} | {project.location}
                  {project.designer && ` | Designed by ${project.designer}`}
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 bg-black/30 hover:bg-black/60 transition-colors p-3 md:p-4 rounded-full text-white"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button 
            className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 bg-black/30 hover:bg-black/60 transition-colors p-3 md:p-4 rounded-full text-white"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </section>
      
      {/* Thumbnail navigation */}
      <section className="bg-darkGray/95 py-6">
        <div className="container mx-auto">
          <div 
            className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar" 
            ref={scrollContainerRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {project.images.map((image, index) => (
              <button
                key={index}
                className={`flex-shrink-0 w-28 md:w-36 h-20 overflow-hidden thumbnail ${
                  index === activeImageIndex ? "ring-2 ring-roseGold" : "ring-1 ring-white/20"
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${project.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Image Carousel - New Addition */}
      {project.id === "ravi-kale-celebrity-home" && (
        <section className="bg-warmWhite py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-3xl mb-10 text-center">Project Gallery</h2>
            <div className="relative max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {project.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <AspectRatio ratio={4/3} className="bg-lightGray/10">
                        <img 
                          src={image} 
                          alt={`${project.title} view ${index + 1}`} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-4 md:-left-12 lg:-left-12 bg-roseGold/90 hover:bg-roseGold text-white border-none" />
                <CarouselNext className="absolute -right-4 md:-right-12 lg:-right-12 bg-roseGold/90 hover:bg-roseGold text-white border-none" />
              </Carousel>
            </div>
          </div>
        </section>
      )}
      
      {/* Project Details */}
      <section className="bg-warmWhite py-20 md:py-32 px-4">
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
                </p>
                
                <h3 className="font-playfair text-2xl mb-6">Features</h3>
                <ul className="space-y-4 mb-12">
                  {project.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <span className="text-roseGold mr-3 text-2xl">•</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-lightGray/30 p-8 rounded-xl sticky top-32">
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
      
      {/* Back to Portfolio */}
      <section className="bg-warmWhite py-12 border-t border-lightGray/30">
        <div className="container mx-auto">
          <Link to="/portfolio" className="inline-flex items-center group text-lg">
            <ChevronLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectPage;
