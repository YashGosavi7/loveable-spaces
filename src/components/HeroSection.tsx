
import { ReactNode } from "react";

interface HeroSectionProps {
  backgroundImage: string;
  children: ReactNode;
  overlay?: boolean;
  overlayOpacity?: string;
}

const HeroSection = ({ 
  backgroundImage, 
  children, 
  overlay = true,
  overlayOpacity = "bg-black/30"
}: HeroSectionProps) => {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {overlay && (
        <div className={`absolute inset-0 ${overlayOpacity}`}></div>
      )}
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
