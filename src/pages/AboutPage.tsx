import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-24">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl bg-warmWhite rounded-lg border border-lightGray/10 p-8 mandala-pattern-bg">
          {/* Hero Image */}
          <div className="w-full mb-8">
            <OptimizedImage
              src="/lovable-uploads/8929c4d3-15f0-44b4-be01-131f3cbfc072.png"
              alt="Elegant interior design by Balaji Design Studio"
              priority={false}
              width={600}
              height={400}
              className="rounded-lg shadow-md w-full"
              loading="lazy"
              quality="medium"
              format="webp"
            />
          </div>
          
          {/* About Us Content */}
          <div className="text-center">
            <h1 className="font-playfair font-semibold text-[clamp(18px,5vw,28px)] text-roseGold mb-4">
              About Us
            </h1>
            
            {/* Content intentionally removed as requested by user */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
