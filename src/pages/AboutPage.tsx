
import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-24">
      <div className="flex flex-col items-center justify-center">
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
