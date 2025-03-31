
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      email: "",
      phone: "",
      projectType: "",
      message: ""
    });
  };
  
  return (
    <div className="min-h-screen pt-24">
      {/* Contact Header */}
      <section className="bg-lightGray py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl mb-6">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We can't wait to bring your vision to life—let's chat about your project!
          </p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="section-padding bg-warmWhite">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mb-4">
                <MapPin size={28} className="text-roseGold" />
              </div>
              <h3 className="font-playfair text-xl mb-2">Visit Us</h3>
              <p className="text-darkGray/80">
                123 Design Street<br />
                Mumbai, Maharashtra<br />
                India - 400001
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mb-4">
                <Phone size={28} className="text-roseGold" />
              </div>
              <h3 className="font-playfair text-xl mb-2">Call Us</h3>
              <p className="text-darkGray/80">
                +91 98765 43210
              </p>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-roseGold">
                WhatsApp Us
              </a>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-roseGold/10 rounded-full flex items-center justify-center mb-4">
                <Mail size={28} className="text-roseGold" />
              </div>
              <h3 className="font-playfair text-xl mb-2">Email Us</h3>
              <a href="mailto:hello@loveable.com" className="text-darkGray/80">
                hello@loveable.com
              </a>
            </div>
          </div>
          
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
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-lightGray rounded p-3"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-lightGray rounded p-3"
                    />
                  </div>
                  
                  <div>
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
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Google Map */}
            <div className="bg-lightGray rounded-lg overflow-hidden h-[400px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.64332144568!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1622536505103!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Loveable Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
