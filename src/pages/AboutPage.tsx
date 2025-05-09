
import React from 'react';
import Layout from '@/components/Layout';
import OptimizedImage from '@/components/OptimizedImage';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/SectionTitle';

const AboutPage = () => {
  // Increased from 15 to 18 years
  const yearsOfExperience = 18;
  
  return (
    <Layout>
      <div className="min-h-screen bg-warmWhite">
        <section className="pt-32 pb-16 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-playfair text-4xl md:text-5xl text-darkGray mb-8">
                  About Loveable Spaces
                </h1>
                <p className="text-darkGray/80 text-lg mb-6">
                  With {yearsOfExperience} years of experience in interior design, we create spaces 
                  that resonate with beauty, functionality, and the unique personality 
                  of our clients.
                </p>
                <p className="text-darkGray/80 mb-6">
                  Our design philosophy centers on creating harmonious environments 
                  that blend aesthetics with practicality. We believe that great design 
                  should not only look beautiful but also enhance how people live, work, 
                  and interact within their spaces.
                </p>
                <p className="text-darkGray/80 mb-8">
                  From residential renovations to commercial projects, our experienced 
                  team brings creativity, technical expertise, and attention to detail to every project, 
                  regardless of scale or complexity.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12">
                  <div className="bg-lightGray/30 p-6 rounded-sm flex-1 min-w-[140px]">
                    <p className="text-3xl font-playfair text-roseGold mb-1">{yearsOfExperience}</p>
                    <p className="text-darkGray/70">Years Experience</p>
                  </div>
                  <div className="bg-lightGray/30 p-6 rounded-sm flex-1 min-w-[140px]">
                    <p className="text-3xl font-playfair text-roseGold mb-1">250+</p>
                    <p className="text-darkGray/70">Projects Completed</p>
                  </div>
                  <div className="bg-lightGray/30 p-6 rounded-sm flex-1 min-w-[140px]">
                    <p className="text-3xl font-playfair text-roseGold mb-1">98%</p>
                    <p className="text-darkGray/70">Happy Clients</p>
                  </div>
                </div>
                
                <Button 
                  asChild
                  className="bg-roseGold hover:bg-roseGold/90 text-white px-8 py-6"
                >
                  <Link to="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="aspect-w-4 aspect-h-5 overflow-hidden rounded-sm">
                  <OptimizedImage
                    src="/lovable-uploads/8929c4d3-15f0-44b4-be01-131f3cbfc072.png"
                    alt="Interior designer at work"
                    className="w-full h-full object-cover"
                    priority={true}
                    preload={true}
                    width={600}
                    height={750}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-lightGray/10">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Our Approach" 
              subtitle="How we create beautiful spaces"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div 
                className="bg-white p-8 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-roseGold">01</span>
                </div>
                <h3 className="text-xl font-playfair text-darkGray mb-4">Discover</h3>
                <p className="text-darkGray/70">
                  We begin by understanding your vision, needs, and lifestyle. This 
                  discovery phase allows us to gather essential insights that will 
                  inform our design decisions.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-roseGold">02</span>
                </div>
                <h3 className="text-xl font-playfair text-darkGray mb-4">Design</h3>
                <p className="text-darkGray/70">
                  Our creative team develops comprehensive design concepts that 
                  transform your requirements into beautifully crafted spaces that 
                  reflect your unique personality.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-roseGold">03</span>
                </div>
                <h3 className="text-xl font-playfair text-darkGray mb-4">Deliver</h3>
                <p className="text-darkGray/70">
                  We manage the entire implementation process, from material selection to 
                  installation, ensuring every detail is executed to perfection for a 
                  seamless experience.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Our Team" 
              subtitle="Meet the creative minds"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: "Sophia Williams",
                  role: "Principal Designer",
                  image: "/lovable-uploads/25d0624e-4f4a-4e2d-a084-f7bf8671b099.png",
                  bio: "With over a decade of experience, Sophia brings a unique blend of creativity and technical expertise to every project."
                },
                {
                  name: "Daniel Chen",
                  role: "Interior Architect",
                  image: "/lovable-uploads/f99d8834-eeec-4f35-b430-48d82f605f55.png",
                  bio: "Daniel specializes in transforming challenging spaces into functional and beautiful environments."
                },
                {
                  name: "Emma Rodriguez",
                  role: "Project Manager",
                  image: "/lovable-uploads/d655dd68-cb8a-43fd-8aaa-38db6cd905c1.png",
                  bio: "Emma ensures that every project runs smoothly from concept through to completion."
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white overflow-hidden rounded-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="aspect-w-3 aspect-h-4">
                    <OptimizedImage 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      width={400}
                      height={533}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-playfair text-darkGray">{member.name}</h3>
                    <p className="text-roseGold mb-4">{member.role}</p>
                    <p className="text-darkGray/70">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-darkGray text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair mb-6">Start Your Design Journey</h2>
              <p className="text-white/80 mb-8 text-lg">
                We're passionate about creating spaces that inspire. Let's collaborate
                to bring your vision to life with thoughtful, personalized interior design.
              </p>
              <Button 
                asChild
                className="bg-roseGold hover:bg-roseGold/90 text-white px-8 py-6 text-lg"
              >
                <Link to="/contact">
                  Schedule a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
