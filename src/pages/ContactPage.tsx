
import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import HeroSection from "@/components/HeroSection";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message Sent",
      description: "We'll get back to you soon!",
      duration: 5000,
    });
    
    setFormData({
      name: "",
      phone: "",
      projectType: "",
      message: ""
    });
  };
  
  return (
    <div className="min-h-screen">
      {/* Contact Hero with Background Image */}
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg"
        overlay={true}
        overlayOpacity="bg-black/50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-white font-semibold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/90">
            Your dream space is just a conversation away. Let's create something incredible together.
          </p>
        </div>
      </HeroSection>
      
      {/* Contact Form and Information */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-playfair text-2xl mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-lightGray rounded p-3"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-lightGray rounded p-3"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                      Project Type*
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full border border-lightGray rounded p-3"
                      required
                    >
                      <option value="">Select a project type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Retail">Retail</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full border border-lightGray rounded p-3"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Book a Free Consultation
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h2 className="font-playfair text-2xl mb-6">Contact Information</h2>
                
                <div className="flex flex-col space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-roseGold/10 rounded-full flex items-center justify-center mr-4">
                      <Phone size={24} className="text-roseGold" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg mb-1">Call Us</h3>
                      <p className="text-darkGray/80">
                        +91 9762000000
                      </p>
                      <a href="https://wa.me/919762000000" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-roseGold/90">
                        Talk to Our Design Experts Now
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-roseGold/10 rounded-full flex items-center justify-center mr-4">
                      <Mail size={24} className="text-roseGold" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg mb-1">Email Us</h3>
                      <a href="mailto:balajidesignstudio@hotmail.com" className="text-darkGray/80">
                        balajidesignstudio@hotmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
