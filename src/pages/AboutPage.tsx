
import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import OptimizedImage from '@/components/OptimizedImage';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="About Us">About Us</SectionTitle>
      
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full max-w-md">
          <OptimizedImage
            src="/lovable-uploads/8929c4d3-15f0-44b4-be01-131f3cbfc072.png"
            alt="Dalpath Suthar"
            priority={true}
            width={600}
            height={800}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
