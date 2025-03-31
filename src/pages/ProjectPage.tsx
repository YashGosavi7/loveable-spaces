
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import projectsData from "../data/projectsData";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const project = projectsData.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen pt-24 section-padding">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-3xl mb-6">Project Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the project you're looking for.</p>
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
  
  return (
    <div className="min-h-screen pt-24">
      {/* Project Slideshow */}
      <section className="bg-darkGray relative">
        <div className="aspect-[16/9] max-h-[80vh] overflow-hidden relative">
          <img 
            src={project.images[activeImageIndex]} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
            <div className="container mx-auto p-8">
              <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white mb-2">
                {project.title}
              </h1>
              <p className="text-white/80 text-xl">
                {project.category} | {project.location}
              </p>
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-darkGray/50 hover:bg-darkGray/80 transition-colors p-2 rounded-full text-white"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-darkGray/50 hover:bg-darkGray/80 transition-colors p-2 rounded-full text-white"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ArrowRight size={24} />
          </button>
        </div>
        
        {/* Thumbnail navigation */}
        <div className="container mx-auto py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {project.images.map((image, index) => (
              <button
                key={index}
                className={`flex-shrink-0 w-20 h-14 overflow-hidden ${
                  index === activeImageIndex ? "ring-2 ring-roseGold" : ""
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
      
      {/* Project Details */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-2xl mb-6">Project Overview</h2>
              <p className="text-lg mb-8 leading-relaxed">
                {project.description}
              </p>
              
              <h3 className="font-playfair text-xl mb-4">Features</h3>
              <ul className="space-y-2 mb-8">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-roseGold mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-1 bg-lightGray p-6 rounded-lg h-fit">
              <h3 className="font-playfair text-xl mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-darkGray/60 text-sm">Category</p>
                  <p className="font-medium">{project.category}</p>
                </div>
                
                <div>
                  <p className="text-darkGray/60 text-sm">Location</p>
                  <p className="font-medium">{project.location}</p>
                </div>
                
                <div>
                  <p className="text-darkGray/60 text-sm">Size</p>
                  <p className="font-medium">{project.size}</p>
                </div>
                
                <div>
                  <p className="text-darkGray/60 text-sm">Completed</p>
                  <p className="font-medium">{project.completionYear}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/contact" className="btn-primary w-full block text-center">
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to Portfolio */}
      <section className="bg-lightGray py-12">
        <div className="container mx-auto text-center">
          <Link to="/portfolio" className="inline-flex items-center text-darkGray hover:text-roseGold transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
