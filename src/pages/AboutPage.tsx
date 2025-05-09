
import React from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import WhatsAppCTA from '@/components/portfolio/WhatsAppCTA';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            
            <p className="font-lato font-light text-[14px] text-darkGray leading-relaxed mb-4">
              Balaji Design Studio transforms spaces into stories. Founded in 2012, we've crafted over 600 projects 
              across Tier 1 cities like Pune, Mumbai, Hyderabad, and Bangalore, blending aesthetic elegance with
              everyday functionality. Our designs are timeless, reflecting the unique essence of each client.
            </p>
            
            <p className="font-lato italic text-[12px] text-lightGray mb-8">
              Designing Spaces That Inspire
            </p>
            
            {/* Experience Tabs */}
            <div className="my-8">
              <Tabs defaultValue="residential" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="residential">Residential</TabsTrigger>
                  <TabsTrigger value="commercial">Commercial</TabsTrigger>
                  <TabsTrigger value="hospitality">Hospitality</TabsTrigger>
                </TabsList>
                <TabsContent value="residential" className="mt-6 text-left">
                  <p className="text-sm text-darkGray/80">
                    From cozy apartments to luxurious villas, we transform living spaces into 
                    personalized sanctuaries that reflect your lifestyle and preferences.
                  </p>
                </TabsContent>
                <TabsContent value="commercial" className="mt-6 text-left">
                  <p className="text-sm text-darkGray/80">
                    We create productive and inspiring commercial environments that enhance 
                    workplace efficiency while making a striking impression on clients.
                  </p>
                </TabsContent>
                <TabsContent value="hospitality" className="mt-6 text-left">
                  <p className="text-sm text-darkGray/80">
                    Our hospitality designs create memorable experiences through thoughtful 
                    spaces that combine functionality with aesthetic appeal.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* CTA Section */}
            <div className="mt-8">
              <p className="text-darkGray font-lato text-sm mb-4">
                Discover how we bring spaces to life – connect with Dalpat Suthar on WhatsApp!
              </p>
              <div className="flex justify-center">
                <WhatsAppCTA text="Chat with Dalpat on WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
