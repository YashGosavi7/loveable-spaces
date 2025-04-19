
import { WhatsApp } from "lucide-react";

interface WhatsAppCTAProps {
  text?: string;
}

const WhatsAppCTA = ({ text = "Chat with Dalpat on WhatsApp" }: WhatsAppCTAProps) => {
  // Dalpat's WhatsApp number (placeholder until confirmed)
  const whatsappNumber = "+919762000000";
  
  return (
    <a 
      href={`https://wa.me/${whatsappNumber}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] 
                 text-white rounded-md transition-colors duration-300 font-lato text-sm md:text-base"
      aria-label="Contact via WhatsApp"
    >
      <WhatsApp size={20} />
      <span>{text}</span>
    </a>
  );
};

export default WhatsAppCTA;
