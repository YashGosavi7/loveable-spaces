
export interface Project {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Hospitality";
  location: string;
  size: string;
  completionYear: string;
  description: string;
  features: string[];
  images: string[];
  isFeatured?: boolean;
  designer?: string;
  tagline?: string;
  style?: string;
}

// Placeholder images from public domain
const projectsData: Project[] = [
  {
    id: "nikhil-nikam-modern-residence",
    title: "Nikhil Nikam's Modern Residence",
    category: "Residential",
    location: "Mumbai",
    size: "2,000 sq ft",
    completionYear: "2025",
    description: "Crafted for Mr. Nikhil Nikam, this Mumbai residence embodies Loveable's vision of warmth and elegance. Spanning 2,000 sq ft, the project features rich wood finishes, soft textiles, and Indian-inspired details like jali screens, creating a perfect balance of modernity and tradition. Our approach to this project focused on creating a harmonious balance between functionality and aesthetic excellence, while incorporating subtle cultural elements that reflect the client's heritage and personal style.",
    features: [
      "Custom ceiling design with wooden accents",
      "Modern LED lighting including feature wall lights",
      "Contemporary modular furniture with warm tones",
      "Minimalist TV wall with integrated storage",
      "Artistic wall paneling with vertical ribbing",
      "Elegant marble-inspired flooring",
      "Space-efficient built-in wardrobes",
      "Subtle cultural elements and art"
    ],
    images: [
      "/lovable-uploads/f5ee7e6c-2a95-4175-ad8c-b39c5989edbc.png",
      "/lovable-uploads/09506ceb-06f0-4edc-8df9-52cfc11d86f9.png",
      "/lovable-uploads/cee99868-3b74-4a2c-a612-cf021461f04e.png",
      "/lovable-uploads/b52db17b-0bb9-4c9d-a33b-acbca15a2a79.png",
      "/lovable-uploads/0ca6700f-3aa4-4261-9d5b-93b736f2dacb.png",
      "/lovable-uploads/5bc6dc7e-be03-49c6-818f-ca1717ddf6e7.png",
      "/lovable-uploads/46f2b2ae-5b91-41d8-af0f-2f4e4b9217d9.png"
    ],
    isFeatured: true,
    designer: "Dalaram Suthar",
    tagline: "A Cozy Haven in Mumbai",
    style: "Warm Minimalism"
  },
  {
    id: "ravi-kale-celebrity-home",
    title: "Ravi Kale's Celebrity Home & Hadapsar Apartment",
    category: "Residential",
    location: "Mumbai & Pune",
    size: "3,500 sq ft",
    completionYear: "2024",
    description: "Designed by Shravan Suthar, this project encompasses a Mumbai residence and a Hadapsar, Pune apartment that embodies our vision of creating spaces filled with love and elegance. The Mumbai property features over 2,000 sq ft of living space with warm wood finishes and plush textiles, while the Hadapsar apartment showcases a contemporary office space with vibrant orange accents and minimalist design. Both projects demonstrate our philosophy of creating a harmonious balance between functionality and aesthetic excellence, incorporating elements of traditional Indian architecture while maintaining a contemporary appeal.",
    features: [
      "Custom jali-inspired partitions",
      "Integrated temple space with traditional elements",
      "Designer dining area with pendant lighting",
      "Modern kitchen with marble backsplash",
      "Contemporary office setup with vibrant color accents",
      "Efficient space utilization for multi-purpose functionality",
      "Warm, neutral color palette throughout",
      "Artisanal details and handcrafted accents"
    ],
    images: [
      "/lovable-uploads/6f4bb809-788e-4c22-9a73-0fd24c6fbc61.png",
      "/lovable-uploads/b420a207-198d-4084-bbb6-40fbd814de50.png",
      "/lovable-uploads/c5141b3f-b0ee-4393-bb50-a0ae2402f071.png",
      "/lovable-uploads/e4e76a6f-d3c6-4791-8799-f931bd28a63a.png", // New Hadapsar apartment image
      "/lovable-uploads/bfd2f8c4-957b-4ddb-9da4-8772ed7840f2.png",
      "/lovable-uploads/5225c2f7-57d9-4da8-8bf3-a9e4fe750f65.png",
      "/lovable-uploads/e81c7af2-7a0f-40c5-a281-932f2ac0007d.png",
      "/lovable-uploads/54a11076-22e6-4005-8066-eb0070bfdc38.png",
      "/lovable-uploads/24c6ec06-e41e-4621-9565-85f1d857a4c5.png",
      "/lovable-uploads/a19eedb8-bc4e-4e31-837c-782e81c3f3d3.png"
    ],
    isFeatured: false,
    designer: "Shravan Suthar"
  },
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
    id: "goa-beach-resort",
    title: "Contemporary Goa Beach Resort",
    category: "Hospitality",
    location: "Goa",
    size: "7,800 sq ft",
    completionYear: "2023",
    description: "This stunning beachfront resort in Goa blends indoor and outdoor living with panoramic ocean views. The design incorporates local materials and traditional Goan architectural elements while providing all modern luxuries expected in a premier resort destination.",
    features: [
      "Infinity pool overlooking the ocean",
      "Open-air restaurant and lounge areas",
      "Private beach access",
      "Locally sourced sustainable materials"
    ],
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
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
    id: "jaipur-heritage-hotel",
    title: "Jaipur Heritage Hotel",
    category: "Hospitality",
    location: "Jaipur",
    size: "12,000 sq ft",
    completionYear: "2022",
    description: "This boutique heritage hotel in Jaipur's old city combines Rajasthani royal aesthetics with contemporary luxury. The restoration preserved original architectural features while introducing modern comforts and amenities for an authentic yet luxurious experience.",
    features: [
      "Restored heritage facade with traditional jharokhas",
      "Courtyard with traditional stepwell-inspired water feature",
      "Rooftop restaurant with city views",
      "Luxury spa featuring traditional Rajasthani treatments"
    ],
    images: [
      "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg",
      "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg",
      "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg"
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
