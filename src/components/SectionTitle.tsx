
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  center = false,
  light = false 
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className={`font-playfair text-3xl md:text-4xl mb-3 ${light ? 'text-white' : 'text-darkGray'}`}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={`text-lg ${light ? 'text-white/80' : 'text-darkGray/80'}`}>
          {subtitle}
        </p>
      )}
      
      <div className={`mt-4 w-24 h-0.5 ${light ? 'bg-white/30' : 'bg-roseGold/30'} ${center ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;
