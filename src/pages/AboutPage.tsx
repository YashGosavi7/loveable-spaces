
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* About Hero */}
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/3048527/pexels-photo-3048527.jpeg"
        overlay={true}
        overlayOpacity="bg-black/40"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-4">
            About Balaji Design Studio
          </h1>
          <p className="text-xl md:text-2xl text-white">
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
              <p className="mb-4 text-lg">
                Founded in 2012 by Dalaram Suthar, Balaji Design Studio has grown from a small studio to a leading interior design firm with over 600 completed projects across all Tier 1 cities in India.
              </p>
              <p className="mb-4 text-lg">
                Our approach blends cultural heritage with modern elegance, creating spaces that feel like home no matter the scale or purpose. We believe that thoughtful design has the power to transform not just spaces, but the lives of those who inhabit them.
              </p>
              <p className="text-lg">
                From Mumbai to Delhi, Bangalore to Chennai, our designs reflect the diverse influences and unique character of each region, while maintaining our signature warmth and attention to detail.
              </p>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg" 
                alt="Balaji Design Studio Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Moved from HomePage */}
      <section className="section-padding bg-lightGray">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3946663/pexels-photo-3946663.jpeg" 
                  alt="Interior design" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] mt-8 overflow-hidden">
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
              <ul className="mb-8 space-y-2">
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
              
              <Link to="/portfolio" className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors inline-block">
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
                <span className="text-2xl text-roseGold">01</span>
              </div>
              <h3 className="font-playfair text-xl mb-3">Personal Connection</h3>
              <p>
                We believe each space should tell a personal story, reflecting the unique character and needs of its inhabitants.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-roseGold">02</span>
              </div>
              <h3 className="font-playfair text-xl mb-3">Timeless Elegance</h3>
              <p>
                We create designs that endure beyond trends, combining classic elements with contemporary sensibilities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-roseGold">03</span>
              </div>
              <h3 className="font-playfair text-xl mb-3">Thoughtful Execution</h3>
              <p>
                From concept to completion, we approach each project with meticulous attention to detail and craftsmanship.
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
              <div className="text-4xl font-playfair text-roseGold mb-2">600+</div>
              <p className="text-white/80">Projects Completed</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl font-playfair text-roseGold mb-2">7</div>
              <p className="text-white/80">Tier 1 Cities</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl font-playfair text-roseGold mb-2">12</div>
              <p className="text-white/80">Years of Excellence</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/portfolio" className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
              Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
