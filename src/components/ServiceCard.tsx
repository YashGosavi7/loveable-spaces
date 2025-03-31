
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-xl">
      <div className="inline-flex items-center justify-center w-14 h-14 mb-6 bg-roseGold/10 rounded-lg">
        <Icon size={28} className="text-roseGold" />
      </div>
      <h3 className="font-playfair text-xl mb-3">{title}</h3>
      <p className="text-darkGray/80">{description}</p>
    </div>
  );
};

export default ServiceCard;
