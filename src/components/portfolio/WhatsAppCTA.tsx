
import { WhatsApp } from "lucide-react";

const WhatsAppCTA = () => {
  return (
    <a 
      href="https://wa.me/+91XXXXXXXXXX" 
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-btn inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 
                rounded font-lato text-sm md:text-base hover:bg-[#128C7E] transition-colors 
                shadow-md hover:shadow-lg"
      aria-label="Chat with Dalpat Suthar on WhatsApp"
    >
      <WhatsApp size={18} />
      Chat with Dalpat on WhatsApp
    </a>
  );
};

export default WhatsAppCTA;
