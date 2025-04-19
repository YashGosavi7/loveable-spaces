
import { Send } from "lucide-react";

interface WhatsAppCTAProps {
  text?: string;
}

const WhatsAppCTA = ({ text = "Connect on WhatsApp" }: WhatsAppCTAProps) => {
  // Dalpat's WhatsApp number (placeholder until confirmed)
  const whatsappNumber = "+919762000000";
  
  return (
    <a 
      href={`https://wa.me/${whatsappNumber}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#F2FCE2] hover:bg-[#E6F4D3] 
                 text-darkGray rounded-md transition-colors duration-300 font-lato text-sm md:text-base 
                 border border-[#D4A017]/30 shadow-sm"
      aria-label="Contact via WhatsApp"
    >
      <Send size={20} className="text-[#128C7E]" />
      <span>{text}</span>
    </a>
  );
};

export default WhatsAppCTA;
