
import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import OptimizedImage from '@/components/OptimizedImage';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle 
        title="About Us" 
        subtitle="Crafting exceptional interior design solutions"
      />
      
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full max-w-2xl text-center mb-12">
          <p className="text-darkGray font-lato text-[clamp(12px,3.5vw,13px)] leading-relaxed">
            We are passionate about creating beautiful, functional spaces that reflect your unique style and needs. 
            Our approach combines creativity, technical expertise, and attention to detail to deliver exceptional results.
          </p>
        </div>
        
        <div className="w-full max-w-md">
          <OptimizedImage
            src="/lovable-uploads/8929c4d3-15f0-44b4-be01-131f3cbfc072.png"
            alt="Balaji Design Studio"
            priority={false}
            width={600}
            height={800}
            className="rounded-lg shadow-lg"
            loading="lazy"
            quality="medium"
            format="webp"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
