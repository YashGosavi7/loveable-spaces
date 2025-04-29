
import React, { ReactNode } from 'react';
import { motion } from "framer-motion";

interface HeroSectionProps {
  backgroundImage: string;
  children: ReactNode;
  overlay?: boolean;
  overlayOpacity?: string;
  showCityScroll?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  backgroundImage, 
  children, 
  overlay = true,
  overlayOpacity = "bg-black/40",
  showCityScroll = false
}) => {
  return (
    <div 
      className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {overlay && (
        <div className={`absolute inset-0 ${overlayOpacity}`}></div>
      )}
      
      <div className="container mx-auto relative z-10 px-4 md:px-0 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.div>
      </div>
      
      {showCityScroll && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div 
            className="w-8 h-12 border-2 border-white/70 rounded-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div 
              className="w-2 h-2 bg-white/70 rounded-full"
              animate={{ 
                y: [0, 12, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
