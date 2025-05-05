
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import OptimizedImage from "@/components/OptimizedImage";
import { motion } from "framer-motion";
import projectsData from "@/data/projectsData";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { getBestProjectImage } from "@/utils/imageSelection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const isMobile = useIsMobile();
  
  // Preload key images and optimize initial load
  useEffect(() => {
    // Prioritize loading critical resources
    const preloadLinks = () => {
      const links = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
      ];
      
      links.forEach(linkData => {
        const link = document.createElement('link');
        Object.entries(linkData).forEach(([key, value]) => {
          if (value !== undefined) link[key] = value;
        });
        document.head.appendChild(link);
      });
    };
    
    preloadLinks();
    
    // Optimally select featured projects
    const selected = projectsData
      .filter(p => p.isFeatured || p.category === "Residential")
      .slice(0, 3);
      
    setFeaturedProjects(selected);
    
    window.setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Clean up event listeners
    return () => {
      // Remove any event listeners if added
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-warmWhite">
      <Helmet>
        <title>Loveable Spaces | Interior Design Portfolio</title>
        <meta 
          name="description" 
          content="Explore our curated collection of interior design projects - residential, commercial and hospitality spaces designed with love."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Helmet>
      
      {/* Hero section with optimized hero image */}
      <section className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-darkGray/40 z-10"></div>
        
        {/* Main hero image with highest optimization priority */}
        <div className="absolute inset-0 w-full h-full">
          {featuredProjects[0] && (
            <OptimizedImage
              src={getBestProjectImage(featuredProjects[0])}
              alt={`${featuredProjects[0].title} interior design by Loveable`}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              priority={true}
              preload={true}
              quality="high"
              skipLazyLoading={true}
            />
          )}
        </div>
        
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl text-white font-playfair mb-6">
              Interior Spaces Designed with Love
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg">
              Explore our curated collection of residential, commercial and hospitality spaces.
            </p>
            <div className="space-x-4">
              <Button 
                asChild
                className="bg-roseGold hover:bg-roseGold/90 text-white px-8 py-6 text-lg"
              >
                <Link to="/portfolio">
                  View Portfolio
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"  
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured projects section */}
      <section className="py-24 bg-warmWhite">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <Link to={`/portfolio/${project.id}`} className="block">
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden mb-4 relative">
                    <OptimizedImage
                      src={getBestProjectImage(project)}
                      alt={`${project.title} by Loveable Interior Design`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={600}
                      height={450}
                      priority={index === 0}
                      preload={index < 2}
                      quality={index === 0 ? "high" : "medium"}
                    />
                    <div className="absolute inset-0 bg-darkGray/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-sm">
                        View Project
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-playfair text-darkGray mb-1">{project.title}</h3>
                  <p className="text-darkGray/80">{project.category} | {project.location}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              className="bg-roseGold hover:bg-roseGold/90 text-white px-8 py-6"
            >
              <Link to="/portfolio">
                Explore All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services section with optimized images */}
      <section className="py-24 bg-lightGray/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Residential Design",
                description: "Transform your home into a beautiful, functional space that reflects your personal style.",
                image: featuredProjects[0]?.images[0] || ""
              },
              {
                title: "Commercial Spaces",
                description: "Create impactful commercial interiors that enhance brand identity and user experience.",
                image: featuredProjects[1]?.images[0] || ""
              },
              {
                title: "Hospitality Design",
                description: "Design memorable hospitality experiences that delight guests and drive business success.",
                image: featuredProjects[2]?.images[0] || ""
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white p-6 shadow-sm rounded-sm"
              >
                <div className="aspect-w-4 aspect-h-3 overflow-hidden mb-4">
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={300}
                    quality="medium"
                  />
                </div>
                <h3 className="text-xl font-playfair text-darkGray mb-2">{service.title}</h3>
                <p className="text-darkGray/80 mb-4">{service.description}</p>
                <Link 
                  to="/services" 
                  className="text-roseGold hover:text-roseGold/80 font-medium"
                >
                  Learn more
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-24 bg-darkGray text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Ready to Create Your Dream Space?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with our expertise in interior design.
          </p>
          <Button 
            asChild
            className="bg-roseGold hover:bg-roseGold/90 text-white px-8 py-6 text-lg"
          >
            <Link to="/contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
