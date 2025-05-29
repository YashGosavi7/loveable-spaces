
import { memo } from "react";
import { useOptimizedImage } from "@/hooks/useOptimizedImage";
import OptimizedImage from "./OptimizedImage";

const HeroSectionNew = memo(() => {
  const { isLoaded, handleImageLoad, placeholderColor } = useOptimizedImage({
    src: "/lovable-uploads/167975c7-1d34-40c1-b4f2-eecc946b18d6.png",
    priority: true,
    preload: true,
    quality: "high"
  });

  return (
    <>
      {/* Preload link for the hero image */}
      <link 
        rel="preload" 
        as="image" 
        href="/lovable-uploads/167975c7-1d34-40c1-b4f2-eecc946b18d6.png"
        fetchPriority="high"
      />
      
      <section className="hero-section relative w-full h-screen flex items-center justify-start overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <OptimizedImage
            src="/lovable-uploads/167975c7-1d34-40c1-b4f2-eecc946b18d6.png"
            alt="Dalpat Suthar of Balaji Design Studio"
            className="w-full h-full object-cover object-center-right"
            width={1920}
            height={1080}
            priority={true}
            preload={true}
            quality="high"
            skipLazyLoading={true}
            onLoad={handleImageLoad}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-[5%] max-w-none">
          <div className="max-w-2xl">
            {/* Main Headline */}
            <h1 className="hero-headline font-playfair text-white font-bold mb-6 leading-tight">
              Balaji Design Studio – Crafting Timeless Interiors Since 2012
            </h1>
            
            {/* Subheading */}
            <p className="hero-subheading text-lightGray font-lato font-light mb-8 leading-relaxed opacity-0 animate-fade-in-delayed">
              Over 600 Projects Across Pune, Mumbai, Hyderabad, and Beyond
            </p>
            
            {/* WhatsApp CTA Button */}
            <a 
              href="https://wa.me/919876543210?text=Hi%20Dalpat,%20I%20would%20like%20to%20discuss%20my%20interior%20design%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn inline-block bg-[#25D366] text-white font-lato font-normal px-6 py-3 rounded-md text-base transition-all duration-300 hover:bg-[#20b858] hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
            >
              Connect with Dalpat Suthar on WhatsApp
            </a>
          </div>
        </div>

        {/* Mandala Border */}
        <div className="mandala-border absolute bottom-0 w-full h-0.5 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-roseGold to-transparent"></div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="scroll-indicator text-lightGray text-2xl cursor-pointer animate-bounce hover:text-white transition-colors duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
});

HeroSectionNew.displayName = "HeroSectionNew";

export default HeroSectionNew;
