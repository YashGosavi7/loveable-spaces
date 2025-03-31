
export interface Project {
  id: string;
  title: string;
  category: "Residential" | "Commercial";
  location: string;
  size: string;
  completionYear: string;
  description: string;
  features: string[];
  images: string[];
  isFeatured?: boolean;
}

// Placeholder images from public domain
const projectsData: Project[] = [
  {
    id: "mumbai-apartment",
    title: "Modern Mumbai Apartment",
    category: "Residential",
    location: "Mumbai",
    size: "1,200 sq ft",
    completionYear: "2023",
    description: "This elegant apartment in the heart of Mumbai combines modern aesthetics with traditional Indian elements. The space was designed to maximize natural light while creating intimate areas for family gatherings. The color palette draws inspiration from the Arabian Sea, with calming blues and sandy neutrals.",
    features: [
      "Open concept living area",
      "Custom built-in cabinetry",
      "Integrated smart home features",
      "Traditional jali-inspired dividers"
    ],
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
    ],
    isFeatured: true
  },
  {
    id: "bangalore-tech-office",
    title: "Innovative Tech Headquarters",
    category: "Commercial",
    location: "Bangalore",
    size: "5,800 sq ft",
    completionYear: "2022",
    description: "This dynamic workspace for a leading tech firm in Bangalore emphasizes creativity and collaboration. The office features flexible workstations, intimate meeting pods, and communal areas that encourage interaction and innovation.",
    features: [
      "Modular workstation design",
      "Acoustic privacy solutions",
      "Indoor garden and meditation space",
      "Interactive presentation areas"
    ],
    images: [
      "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
      "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg",
      "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg"
    ],
    isFeatured: true
  },
  {
    id: "delhi-villa",
    title: "Luxurious Delhi Villa",
    category: "Residential",
    location: "Delhi",
    size: "4,500 sq ft",
    completionYear: "2023",
    description: "This grand Delhi villa reimagines luxury living with thoughtfully designed spaces that blend opulence with comfort. From the double-height entryway to the meticulously landscaped courtyard, every element was curated to create a seamless transition between indoor and outdoor living.",
    features: [
      "Double-height living room",
      "Indoor courtyard with water feature",
      "Temperature-controlled wine cellar",
      "Custom art installations by local artists"
    ],
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
    ],
    isFeatured: true
  },
  {
    id: "chennai-restaurant",
    title: "Coastal Cuisine Restaurant",
    category: "Commercial",
    location: "Chennai",
    size: "2,800 sq ft",
    completionYear: "2021",
    description: "This contemporary restaurant captures the essence of Chennai's coastal heritage while creating an elevated dining experience. The space uses natural materials and a carefully considered layout to enhance the dining journey and highlight the chef's culinary artistry.",
    features: [
      "Custom lighting inspired by traditional fishing lanterns",
      "Private dining alcoves",
      "Open kitchen concept",
      "Handcrafted furniture by local artisans"
    ],
    images: [
      "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg"
    ]
  },
  {
    id: "hyderabad-penthouse",
    title: "Sophisticated Hyderabad Penthouse",
    category: "Residential",
    location: "Hyderabad",
    size: "3,200 sq ft",
    completionYear: "2022",
    description: "Perched atop a luxury high-rise in Hyderabad, this penthouse offers panoramic city views while creating an intimate sanctuary for its owners. The design balances minimalist contemporary elements with rich textures and subtle nods to Hyderabad's architectural heritage.",
    features: [
      "Wrap-around terrace with outdoor living area",
      "Custom stone and metalwork",
      "Automated lighting and climate systems",
      "Curated art collection featuring local artists"
    ],
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg"
    ]
  },
  {
    id: "kolkata-boutique",
    title: "Heritage-Inspired Fashion Boutique",
    category: "Commercial",
    location: "Kolkata",
    size: "1,800 sq ft",
    completionYear: "2023",
    description: "This boutique in Kolkata's historic district reimagines traditional Bengali architecture for a contemporary retail experience. The space honors the building's colonial past while creating a sophisticated backdrop for modern fashion.",
    features: [
      "Restored architectural details",
      "Custom display systems",
      "Intimate fitting lounges",
      "Integrated heritage storytelling elements"
    ],
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg",
      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg",
      "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg"
    ]
  }
];

export default projectsData;
