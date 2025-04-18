
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
    id: "bhushan-naikwadi-elegant-abode",
    title: "Bhushan Naikwadi's Elegant Abode",
    category: "Residential",
    location: "Pune",
    size: "1,800 sq ft",
    completionYear: "2025",
    description: "Crafted for Mr. Bhushan Naikwadi, this Pune residence embodies Loveable's vision of warmth and elegance. The design blends modern minimalism with rich Indian heritage, featuring warm teak wood finishes, soft handwoven textiles, and subtle jali screen accents, creating a harmonious blend of modern comfort and Indian tradition. The home demonstrates our philosophy of creating spaces that honor cultural elements while delivering contemporary functionality and aesthetic excellence.",
    features: [
      "Custom jali-inspired wooden partitions and cabinetry",
      "Handcrafted mandala artwork showcasing traditional Indian motifs",
      "Warm ambient lighting with wooden ceiling fan elements",
      "Bespoke furniture with natural cane weaving details",
      "Traditional temple space with modern interpretation",
      "Contemporary living room with wooden accent wall",
      "Space-optimizing wardrobes and storage solutions",
      "Elegant entrance with traditional Indian influences"
    ],
    images: [
      "/lovable-uploads/7a9b0e2f-c1e3-43ef-b9c6-aa850fe2eb1c.png",
      "/lovable-uploads/59d47f06-4804-44f0-9b05-dc61f36623c0.png",
      "/lovable-uploads/94247c8f-238a-4f8e-9629-5a3b60a5df84.png",
      "/lovable-uploads/33bf1683-11c9-4576-b811-98408302083a.png",
      "/lovable-uploads/5d5e5726-e734-49b1-8119-b134d03c74c8.png",
      "/lovable-uploads/8ebf3bc3-a5cd-4905-9f27-21b6e529eddb.png",
      "/lovable-uploads/3914b6c6-9c40-4585-a168-6d363e94e610.png",
      "/lovable-uploads/88614b3e-de34-4dc9-821d-64f73b6c4930.png",
      "/lovable-uploads/cc7886ad-97f8-4b34-995d-ffba8b41e2b0.png"
    ],
    isFeatured: true,
    designer: "Shravan Suthar",
    tagline: "A Timeless Home in Pune",
    style: "Warm Indian Minimalism"
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
      "/lovable-uploads/e4e76a6f-d3c6-4791-8799-f931bd28a63a.png",
      "/lovable-uploads/bfd2f8c4-957b-4ddb-9da4-8772ed7840f2.png",
      "/lovable-uploads/5225c2f7-57d9-4da8-8bf3-a9e4fe750f65.png",
      "/lovable-uploads/e81c7af2-7a0f-40c5-a281-932f2ac0007d.png",
      "/lovable-uploads/54a11076-22e6-4005-8066-eb0070bfdc38.png",
      "/lovable-uploads/24c6ec06-e41e-4621-9565-85f1d857a4c5.png",
      "/lovable-uploads/a19eedb8-bc4e-4e31-837c-782e81c3f3d3.png"
    ],
    isFeatured: true,
    designer: "Shravan Suthar"
  },
  {
    id: "grandeur-wedding-hall",
    title: "Grandeur Wedding Hall",
    category: "Commercial",
    location: "Delhi",
    size: "5,000 sq ft",
    completionYear: "2023",
    description: "Crafted for grand celebrations, the Grandeur Wedding Hall in Delhi showcases Loveable's mastery in creating luxurious, welcoming spaces. Spanning 5,000 sq ft, the venue features ornate chandeliers, intricate mandala-inspired wall panels, and warm, golden lighting, blending Indian tradition with modern elegance to create unforgettable wedding moments. The hall incorporates subtle cultural motifs throughout, with hand-carved wooden elements and premium materials that create a sense of opulence while maintaining warmth and approachability.",
    features: [
      "Crystal chandelier installation with customized lighting design",
      "Hand-carved wooden mandap with intricate detailing",
      "Premium Italian marble flooring with brass inlays",
      "Acoustically optimized space for music and speeches",
      "Custom wall paneling with gold-leaf geometric patterns",
      "Integrated state-of-the-art audiovisual systems",
      "Flexible seating arrangements accommodating up to 300 guests",
      "Elegant drapery with traditional Indian motifs"
    ],
    images: [
      "/lovable-uploads/eea53347-13c4-4190-a5e7-2884b1eeba4c.png",
      "/lovable-uploads/18ae3aa6-c2eb-494a-b249-9c39020ebe2b.png",
      "/lovable-uploads/76be1317-69fb-4e4c-9403-acfd0f29aaa7.png",
      "/lovable-uploads/ca4507e9-02dd-4fcd-9e2b-77405883fa9f.png",
      "/lovable-uploads/40a33995-6522-4218-80ca-423333a06e58.png",
      "/lovable-uploads/c9e93dc4-4dfc-474b-b75a-38fb4ee1cabf.png",
      "/lovable-uploads/de461583-050a-46ef-ad14-2c60f8993e50.png",
      "/lovable-uploads/ac8a7286-1971-4aa0-bbd7-3d6499a3c9c9.png",
      "/lovable-uploads/e6e7be2a-5cb9-4696-830b-ec8880f338eb.png"
    ],
    isFeatured: true,
    designer: "Dalaram Suthar",
    tagline: "A Celebration Space in Delhi",
    style: "Luxurious Indian Contemporary"
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
