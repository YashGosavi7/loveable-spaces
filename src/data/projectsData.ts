import { ProjectCategory } from "../components/portfolio/CategoryFilter";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  size: string;
  completionYear: string;
  description: string;
  features: string[];
  images: string[];
  isFeatured: boolean;
  designer: string;
  tagline: string;
  style: string;
}

const projectsData: Project[] = [
  {
    id: "mr-kale-office",
    title: "Mr. Kale's Office",
    category: "Commercial",
    location: "Pune",
    size: "1,200 sq ft",
    completionYear: "2023",
    description: "A modern office space designed for productivity and comfort, featuring sleek furniture, integrated technology, and a sophisticated color palette of neutral tones with bold accent pieces. The design incorporates natural light, glass partitioning, and greenery to create an open, airy environment while maintaining privacy where needed.",
    features: [
      "Custom reception desk with backlit logo",
      "Private executive office with acoustic treatments",
      "Open-plan workspace with ergonomic furniture",
      "Conference room with integrated AV system",
      "Collaboration zones with flexible seating arrangements",
      "Kitchen and refreshment area",
      "Storage solutions integrated into the wall design",
      "Smart lighting and climate control systems",
      "Branded interior elements throughout the space",
      "Biophilic design elements for employee wellbeing"
    ],
    images: [
      "/lovable-uploads/5398dd36-7556-4e81-977a-b70f872a8082.png",
      "/lovable-uploads/6f4bb809-788e-4c22-9a73-0fd24c6fbc61.png",
      "/lovable-uploads/0150a831-8d44-4fdb-a0f7-229419ab3a1c.png",
      "/lovable-uploads/16c3976-5536-4565-94e3-63a6ae016de9.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Where Professionalism Meets Comfort",
    style: "Contemporary Corporate"
  },
  {
    id: "dr-shrotri-residence",
    title: "Dr. Shrotri's Residence",
    category: "Residential",
    location: "Solapur",
    size: "2,800 sq ft",
    completionYear: "2022",
    description: "A luxurious family home designed with a focus on comfort and elegance. The residence features spacious living areas, a gourmet kitchen, and serene bedrooms, all adorned with high-end finishes and custom details. The design incorporates traditional Indian elements with a modern twist, creating a warm and inviting atmosphere.",
    features: [
      "Grand foyer with custom chandelier",
      "Spacious living room with fireplace",
      "Gourmet kitchen with premium appliances",
      "Formal dining room for family gatherings",
      "Master suite with walk-in closet and spa-like bathroom",
      "Children's bedrooms with playful themes",
      "Home theater with surround sound system",
      "Outdoor terrace with seating and dining areas",
      "Landscaped garden with water feature",
      "Smart home automation system"
    ],
    images: [
      "/lovable-uploads/9f959359-4449-4951-825d-3599875a990a.png",
      "/lovable-uploads/4999a6c5-4479-49e9-899a-a939a1990a19.png",
      "/lovable-uploads/64c1994b-290b-4991-850d-95668708455a.png",
      "/lovable-uploads/9973291b-7c1c-48c9-b95c-4c9b9a93544b.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Luxury Redefined for Modern Living",
    style: "Modern Traditional"
  },
  {
    id: "adv-raut-bungalow",
    title: "Adv. Raut's Bungalow",
    category: "Residential",
    location: "Latur",
    size: "3,500 sq ft",
    completionYear: "2021",
    description: "An expansive bungalow designed for a prominent lawyer, featuring a grand library, a sophisticated home office, and luxurious living spaces. The design emphasizes privacy and functionality, with a seamless blend of traditional and contemporary elements. High-quality materials and meticulous craftsmanship ensure a timeless appeal.",
    features: [
      "Private library with custom bookshelves",
      "Executive home office with state-of-the-art technology",
      "Formal living room with elegant furnishings",
      "Spacious dining area for entertaining guests",
      "Master suite with private balcony",
      "Guest bedrooms with en-suite bathrooms",
      "Outdoor patio with barbecue area",
      "Landscaped garden with mature trees",
      "Security system with surveillance cameras",
      "Smart lighting and climate control systems"
    ],
    images: [
      "/lovable-uploads/098e294b-9991-4b2d-b141-089298079c35.png",
      "/lovable-uploads/644a09c7-549a-490d-8541-5151918952f5.png",
      "/lovable-uploads/92516991-7e93-409a-8977-a7e89991922b.png",
      "/lovable-uploads/999c51c9-c991-493d-9451-a85597f9c199.png"
    ],
    isFeatured: false,
    designer: "Dalpat Suthar",
    tagline: "Where Legal Minds Find Comfort",
    style: "Contemporary Classic"
  },
  {
    id: "mittal-residence",
    title: "Mittal Residence",
    category: "Residential",
    location: "Mumbai",
    size: "4,200 sq ft",
    completionYear: "2020",
    description: "A stunning penthouse apartment designed with panoramic city views, featuring open-plan living spaces, a state-of-the-art kitchen, and luxurious bedrooms. The design incorporates high-end finishes, custom lighting, and smart home technology to create a sophisticated and comfortable urban retreat.",
    features: [
      "Open-plan living and dining area with city views",
      "Gourmet kitchen with premium appliances",
      "Master suite with walk-in closet and spa-like bathroom",
      "Guest bedrooms with en-suite bathrooms",
      "Home theater with surround sound system",
      "Private terrace with seating and dining areas",
      "Smart home automation system",
      "Custom lighting design",
      "High-end finishes throughout the apartment",
      "Panoramic city views"
    ],
    images: [
      "/lovable-uploads/12a7c90c-9c9a-4b1a-8b1a-1b9b8b8b8b8b.png",
      "/lovable-uploads/23b8d7e6-7a8b-4b1c-9c1d-3e5f7a8b4c1e.png",
      "/lovable-uploads/34c9e8f7-8b9c-4c2d-ad3e-5f7a8b4c1e2f.png",
      "/lovable-uploads/45d0f9a8-9ca0-4d3e-be4f-7a8b4c1e2f3g.png"
    ],
    isFeatured: false,
    designer: "Dalpat Suthar",
    tagline: "Urban Living at Its Finest",
    style: "Contemporary Luxury"
  },
  {
    id: "jagtap-house",
    title: "Jagtap House",
    category: "Residential",
    location: "Satara",
    size: "2,500 sq ft",
    completionYear: "2019",
    description: "A cozy family home designed with a focus on functionality and comfort, featuring open living spaces, a modern kitchen, and comfortable bedrooms. The design incorporates natural materials, warm colors, and custom details to create a welcoming and inviting atmosphere.",
    features: [
      "Open-plan living and dining area",
      "Modern kitchen with stainless steel appliances",
      "Master suite with walk-in closet",
      "Children's bedrooms with playful themes",
      "Outdoor patio with seating area",
      "Landscaped garden with play area",
      "Energy-efficient lighting and appliances",
      "Custom storage solutions",
      "Natural materials and warm colors",
      "Welcoming and inviting atmosphere"
    ],
    images: [
      "/lovable-uploads/56e102b9-ab0d-4e4f-bf5a-1a2b3c4d5e6f.png",
      "/lovable-uploads/67f213c0-bc1e-4f50-c06b-2b3c4d5e6f7a.png",
      "/lovable-uploads/78g324d1-cd2f-4f61-d17c-3c4d5e6f7a8b.png",
      "/lovable-uploads/89h435e2-de30-4f72-e28d-4d5e6f7a8b9c.png"
    ],
    isFeatured: false,
    designer: "Dalpat Suthar",
    tagline: "A Home Where Memories Are Made",
    style: "Modern Rustic"
  },
  {
    id: "dada-rao-danve-residence",
    title: "Dada Rao Danve Residence",
    category: "Residential",
    location: "Jalna",
    size: "3,200 sq ft",
    completionYear: "2025",
    description: "Dada Rao Danve's residence in Jalna blends modern luxury with Maratha heritage, featuring intricate jali work, warm teak wood finishes, and a serene courtyard, crafted by Loveable in 2025.",
    features: [
      "Traditional jali work adorning the windows and balconies",
      "Warm teak wood finishes throughout the home",
      "Serene central courtyard with water feature",
      "Modern kitchen with premium appliances",
      "Master suite with traditional Maratha design elements",
      "Guest bedrooms with en-suite bathrooms",
      "Living area with heritage-inspired furnishings",
      "Energy-efficient smart home features",
      "Indoor-outdoor living spaces",
      "Custom lighting design highlighting architectural elements"
    ],
    images: [
      "/lovable-uploads/97278d17-3093-436c-a19e-8c2c5a918c63.png",
      "/lovable-uploads/da50fe76-e092-487a-99e8-224725915191.png",
      "/lovable-uploads/69fe8d07-6bd4-4574-a901-b045e0b7457e.png",
      "/lovable-uploads/68bfafb1-507b-4e9e-9b8d-3ececf2f99e9.png",
      "/lovable-uploads/8926e94d-51dc-49d0-b9c6-c21e5fb20b78.png",
      "/lovable-uploads/aeabbe0a-f9d5-452d-a091-30fbd274a362.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Maratha Heritage Meets Modern Luxury",
    style: "Indo-Contemporary"
  }
];

export default projectsData;
