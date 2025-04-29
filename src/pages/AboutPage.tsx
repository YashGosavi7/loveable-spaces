
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
      
      {/* Studio Overview */}
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
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Journey */}
      <section className="section-padding bg-lightGray">
        <div className="container mx-auto">
          <SectionTitle 
            title="Founder's Journey" 
            subtitle="The story of passion, perseverance and excellence" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[4/3] mb-4">
                <img 
                  src="/lovable-uploads/fdbdc025-28e1-45fd-a652-5b794cd8841d.png" 
                  alt="Dalpat Suthar receiving an award" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl mb-2">Early Recognition</h3>
              <p className="text-darkGray/80">
                Dalpat's talent was recognized early, receiving accolades for his innovative approach to spatial design and cultural integration.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[4/3] mb-4">
                <img 
                  src="/lovable-uploads/b6b202ac-c4a6-4486-b743-69cfe1242cb5.png" 
                  alt="Dalpat Suthar with industry leaders" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl mb-2">Industry Connections</h3>
              <p className="text-darkGray/80">
                Building relationships with key industry figures helped Dalpat expand the studio's reach and influence across India's design landscape.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[4/3] mb-4">
                <img 
                  src="/lovable-uploads/992b26d9-1aba-4ad4-b2a4-67c3e64f3510.png" 
                  alt="Dalpat Suthar receiving an award from a woman in a red dress" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl mb-2">Design Excellence</h3>
              <p className="text-darkGray/80">
                Throughout his career, Dalpat has been honored with numerous awards for design excellence and contribution to India's interior design community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              <div className="aspect-[3/4] overflow-hidden rounded shadow-md">
                <img 
                  src="https://images.pexels.com/photos/3946663/pexels-photo-3946663.jpeg" 
                  alt="Interior design" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] mt-8 overflow-hidden rounded shadow-md">
                <img 
                  src="https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg" 
                  alt="Interior design" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-playfair text-3xl md:text-4xl mb-6">Crafting Iconic Spaces Since 2012</h2>
              <p className="mb-6 text-lg">
                At Balaji Design Studio, every space tells a story. Since 2012, we have been transforming over 600 homes, offices, and restaurants across Pune, Mumbai, Hyderabad, Bangalore, and beyond.
              </p>
              <p className="mb-6 text-lg">
                From luxurious residences to high-impact commercial spaces, our designs blend aesthetic brilliance with everyday functionality. We believe that great design isn't just about how a space looks—it's about how it feels.
              </p>
              
              <h3 className="font-playfair text-2xl mb-4">Why Choose Balaji Design Studio?</h3>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="text-roseGold mr-2">✓</span>
                  <span>Over 600+ successful projects delivered with excellence</span>
                </li>
                <li className="flex items-center">
                  <span className="text-roseGold mr-2">✓</span>
                  <span>Expertise in residential, commercial & hospitality interiors</span>
                </li>
                <li className="flex items-center">
                  <span className="text-roseGold mr-2">✓</span>
                  <span>A team of visionary designers who bring ideas to life</span>
                </li>
                <li className="flex items-center">
                  <span className="text-roseGold mr-2">✓</span>
                  <span>A seamless design process, tailored to your needs</span>
                </li>
              </ul>
              
              <Link to="/portfolio" className="bg-roseGold/90 text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold transition-colors inline-block">
                Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <SectionTitle 
            title="Our Values" 
            subtitle="The principles that guide our design philosophy" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-roseGold/90">01</span>
              </div>
              <h3 className="font-playfair text-xl mb-3">Personal Connection</h3>
              <p>
                We believe each space should tell a personal story, reflecting the unique character and needs of its inhabitants
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-roseGold/90">02</span>
              </div>
              <h3 className="font-playfair text-xl mb-3">Timeless Elegance</h3>
              <p>
                We create designs that endure beyond trends, combining classic elements with contemporary sensibilities
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-roseGold/90">03</span>
              </div>
              <h3 className="font-playfair text-xl mb-3">Thoughtful Execution</h3>
              <p>
                From concept to completion, we approach each project with meticulous attention to detail and craftsmanship
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Achievements */}
      <section className="section-padding bg-darkGray text-white">
        <div className="container mx-auto">
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
              Founded in 2012, Loveable has delivered over 600 projects across Tier 1 cities, 
              crafting spaces with passion and expertise starting at 15k.
            </p>
            <WhatsAppCTA text="Connect with Dalpat on WhatsApp" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
