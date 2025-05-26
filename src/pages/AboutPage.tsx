
import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-24">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-warmWhite rounded-lg border border-lightGray/10 p-8 mandala-pattern-bg">
          {/* Founder Image */}
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="md:w-1/2 overflow-hidden rounded-lg shadow-lg relative">
              <AspectRatio ratio={4/3} className="bg-gradient-to-br from-roseGold/10 to-darkBrown/5">
                <div className="absolute inset-0 border-[3px] border-roseGold/20 rounded-lg m-1 pointer-events-none z-10"></div>
                <OptimizedImage
                  src="/lovable-uploads/16784a42-ae99-4107-9a18-a8595cbdf738.png"
                  alt="Balaji Design Studio founder in a beautifully designed interior space"
                  width={600}
                  height={450}
                  className="rounded-lg object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  quality="high"
                  format="webp"
                />
              </AspectRatio>
              
              <div className="absolute -bottom-4 -right-4 hidden md:block">
                <Avatar className="w-16 h-16 border-2 border-warmWhite">
                  <AvatarImage src="/lovable-uploads/16784a42-ae99-4107-9a18-a8595cbdf738.png" />
                  <AvatarFallback className="bg-roseGold text-white">DS</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="font-playfair text-2xl text-roseGold">Our Story</h2>
              <p className="text-darkGray leading-relaxed">
                Founded in 2012 by Dalpat Suthar, Balaji Design Studio has grown from a small studio to a leading interior design firm with over 600 completed projects across all Tier 1 cities in India.
              </p>
              <p className="text-darkGray leading-relaxed">
                Our approach blends cultural heritage with modern elegance, creating spaces that feel like home no matter the scale or purpose. We believe that thoughtful design has the power to transform not just spaces, but the lives of those who inhabit them.
              </p>
              <p className="text-darkGray leading-relaxed">
                From Mumbai to Delhi, Bangalore to Chennai, our designs reflect the diverse influences and unique character of each region, while maintaining our signature warmth and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
