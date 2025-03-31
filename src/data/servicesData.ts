
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
    description: "Creating cozy, elegant homes that reflect your personality and lifestyle needs while emphasizing comfort, functionality, and timeless aesthetics.",
    icon: "home"
  },
  {
    id: "commercial",
    title: "Commercial Interiors",
    description: "Designing office spaces and workplaces that inspire productivity and creativity while ensuring efficient workflows and employee well-being.",
    icon: "building"
  },
  {
    id: "restaurant",
    title: "Restaurant Design",
    description: "Blending aesthetics with functionality for an unforgettable dining experience that enhances your culinary concept and delights guests.",
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
