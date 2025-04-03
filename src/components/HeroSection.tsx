
import { ReactNode } from "react";
import CityScrollAnimation from "./CityScrollAnimation";

interface HeroSectionProps {
  backgroundImage: string;
  children: ReactNode;
  overlay?: boolean;
  overlayOpacity?: string;
  showCityScroll?: boolean;
  credibilityStatement?: string;
}

const HeroSection = ({ 
  backgroundImage, 
  children, 
  overlay = true,
  overlayOpacity = "bg-black/30",
  showCityScroll = false,
  credibilityStatement = "600+ Projects Across India's Leading Cities"
}: HeroSectionProps) => {
  return (
    <section 
      className="relative h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {overlay && (
        <div className={`absolute inset-0 ${overlayOpacity}`}></div>
      )}
      
      <div className="container mx-auto px-4 py-24 relative z-10 flex-grow flex items-center justify-center">
        {children}
      </div>
      
      {showCityScroll && (
        <div className="w-full relative z-10 mt-auto pb-6">
          {credibilityStatement && (
            <div className="text-center py-5 bg-darkGray/70 px-4 mb-3">
              <p className="text-white font-playfair text-lg md:text-2xl max-w-full overflow-hidden text-ellipsis whitespace-normal">
                {credibilityStatement}
              </p>
            </div>
          )}
          <CityScrollAnimation speed="medium" />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
