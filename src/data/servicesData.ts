
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const servicesData: Service[] = [
  {
    id: "residential",
    title: "Residential Design",
    description: "Timeless homes, built around you. Personalized, elegant, and functional living spaces that reflect your unique lifestyle.",
    icon: "home"
  },
  {
    id: "commercial",
    title: "Commercial Interiors",
    description: "Offices that redefine work. Smart, modern, and designed for success, enhancing productivity and employee well-being.",
    icon: "building"
  },
  {
    id: "restaurant",
    title: "Restaurant Design",
    description: "Ambience meets appetite. Designs that make every meal an experience, enhancing your culinary concept and delighting guests.",
    icon: "utensils"
  },
  {
    id: "retail",
    title: "Retail Spaces",
    description: "Creating immersive shopping environments that strengthen your brand identity and enhance the customer journey from entrance to checkout.",
    icon: "briefcase"
  },
  {
    id: "consultation",
    title: "Design Consultation",
    description: "Expert guidance for your space transformation, providing tailored advice on layouts, materials, color schemes, and furnishing selections.",
    icon: "map-pin"
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Comprehensive oversight of your design project from concept to completion, ensuring quality execution within timeline and budget constraints.",
    icon: "circle-dollar-sign"
  },
];

export default servicesData;
