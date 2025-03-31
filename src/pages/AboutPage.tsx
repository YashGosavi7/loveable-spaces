
import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import TeamMember from "../components/TeamMember";
import teamData from "../data/teamData";

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
              <div className="flex items-center mb-6">
                <h2 className="font-playfair text-3xl mb-0 mr-4">Our Story</h2>
                <img 
                  src="/lovable-uploads/53764224-0c8e-4dd4-9e9e-908c69e2d74a.png" 
                  alt="Balaji Design Studio Logo" 
                  className="h-16 hidden md:block" 
                />
              </div>
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
      
      {/* Our Values */}
      <section className="section-padding bg-lightGray">
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
      
      {/* Team Section */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <SectionTitle 
            title="Meet Our Team" 
            subtitle="The creative minds behind Balaji Design Studio's designs" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member) => (
              <TeamMember 
                key={member.id}
                name={member.name}
                title={member.title}
                bio={member.bio}
                image={member.image}
              />
            ))}
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
          
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-lg mb-8">
              We've had the privilege of working with a diverse range of clients across Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, and Pune, bringing their visions to life through our designs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
