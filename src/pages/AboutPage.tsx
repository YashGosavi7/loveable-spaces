
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import WhatsAppCTA from "../components/portfolio/WhatsAppCTA";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* About Hero with Background Image */}
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        overlay={true}
        overlayOpacity="bg-black/60"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-white font-semibold mb-4">
            About Balaji Design Studio
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Crafting spaces that inspire love and comfort since 2012
          </p>
        </div>
      </HeroSection>
      
      {/* Studio Overview - Kept this section */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl mb-6">Our Story</h2>
              <p className="mb-6 text-lg">
                Founded in 2012 by Dalpat Suthar, Balaji Design Studio has grown from a small studio to a leading interior design firm with over 600 completed projects across all Tier 1 cities in India.
              </p>
              <p className="mb-6 text-lg">
                Our approach blends cultural heritage with modern elegance, creating spaces that feel like home no matter the scale or purpose. We believe that thoughtful design has the power to transform not just spaces, but the lives of those who inhabit them.
              </p>
              <p className="text-lg">
                From Mumbai to Delhi, Bangalore to Chennai, our designs reflect the diverse influences and unique character of each region, while maintaining our signature warmth and attention to detail.
              </p>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/lovable-uploads/f99d8834-eeec-4f35-b430-48d82f605f55.png" 
                alt="Dalpat Suthar in a modern living room design" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements - Kept and centered */}
      <section className="section-padding bg-darkGray text-white">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <SectionTitle 
            title="Our Achievements" 
            subtitle="A decade of creating beautiful spaces across India" 
            center 
            light 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="text-4xl font-playfair text-roseGold/90 mb-2">600+</div>
              <p className="text-white/80">Projects Completed</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl font-playfair text-roseGold/90 mb-2">7</div>
              <p className="text-white/80">Tier 1 Cities</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl font-playfair text-roseGold/90 mb-2">12</div>
              <p className="text-white/80">Years of Excellence</p>
            </div>
          </div>
          
          <div className="mt-12 text-center space-y-6">
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Founded in 2012, Balaji Design Studio has delivered over 600 projects across Tier 1 cities, 
              crafting spaces with passion and expertise.
            </p>
            <WhatsAppCTA text="Connect with Dalpat on WhatsApp" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
