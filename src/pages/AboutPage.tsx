
import React, { useEffect } from 'react';
import OptimizedImage from '@/components/OptimizedImage';

const AboutPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-warmWhite flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="aspect-w-4 aspect-h-5 overflow-hidden rounded-sm">
            <OptimizedImage
              src="/lovable-uploads/photo-1581092795360-fd1ca04f0952.png" 
              alt="Dalpath Suthar"
              className="w-full h-full object-cover"
              priority={true}
              preload={true}
              width={600}
              height={750}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
