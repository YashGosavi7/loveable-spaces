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

const projectsData: Project[] = [
  {
    id: "samir-ghule-duplex-flat",
    title: "Mr. Samir Ghule's Duplex Flat",
    category: "Residential",
    location: "Pune",
    size: "2,800 sq ft",
    completionYear: "2025",
    description: "An elegant duplex flat designed for Mr. Samir Ghule showcasing modern luxury living. The space features sophisticated bedroom designs with custom lighting, premium materials, and thoughtful spatial planning. Notable elements include a bespoke workspace integration, designer furniture, and a harmonious blend of warm wood tones with neutral colors. The entertainment area showcases a stunning media wall with curated artwork, while the pooja room reflects traditional values with contemporary aesthetics.",
    features: [
      "Custom LED ceiling design with modern fan",
      "Integrated workspace with cork board",
      "Designer seating area with rust-colored accent chairs",
      "Premium wardrobe with geometric patterns",
      "Smart TV setup with entertainment unit",
      "Built-in study desk with storage",
      "Floor-to-ceiling curtains with automated control",
      "Gold accent details throughout the space",
      "Contemporary pooja room with modern interpretations",
      "Marble-finished kitchen with premium appliances",
      "Elegant staircase with architectural lighting",
      "Custom-designed dining area with artistic elements",
      "Media room with premium entertainment system",
      "Bespoke entrance unit with family name display",
      "Traditional pooja room with modern aesthetics"
    ],
    images: [
      "/lovable-uploads/69ec1e87-1249-492e-8ff9-298eebf23db8.png",
      "/lovable-uploads/eaf8abd9-9b29-4e7d-a0a1-dfa938ac007e.png",
      "/lovable-uploads/23180269-6c58-4406-8b83-2b08c6d62711.png",
      "/lovable-uploads/8890830f-3b8e-4bfa-b765-17adb3f32503.png",
      "/lovable-uploads/4087f33e-e77f-4ae9-a390-d7a2492b4e93.png",
      "/lovable-uploads/d09f42ee-d921-46eb-95f8-ba30b5327c51.png",
      "/lovable-uploads/10b63de8-31ae-4fc5-a67e-ecd079e7d72a.png",
      "/lovable-uploads/b682a7cf-b4cf-4191-b90e-69169ad66bd7.png",
      "/lovable-uploads/75e23826-7fb8-4636-9799-17eaf7952a33.png",
      "/lovable-uploads/9a92d3e9-4b9c-46bd-b027-4471187f6181.png",
      "/lovable-uploads/25d0624e-4f4a-4e2d-a084-f7bf8671b099.png",
      "/lovable-uploads/2c7d97e4-a77f-4cce-8cd0-2116034c039a.png",
      "/lovable-uploads/720e8505-438e-4f5a-8ea2-bbd282fd5db1.png",
      "/lovable-uploads/92a8b763-320c-4b02-82ad-74db1478f7e7.png",
      "/lovable-uploads/f7be22f5-b0b9-40b6-a0da-023a44e9eb6f.png",
      "/lovable-uploads/af6bcccb-acd3-44d7-af6a-307ea12f304a.png",
      "/lovable-uploads/a655d983-c4c8-4255-9546-a899bfee24d6.png",
      "/lovable-uploads/d4581ac8-e503-4095-aa2f-6929d2c5d1ed.png",
      "/lovable-uploads/5a2aff14-bcc9-4961-8bb3-d51feedd8898.png",
      "/lovable-uploads/2faf3e3c-8c50-4e9e-a1f1-ac68389af958.png",
      "/lovable-uploads/1c3e331c-5b8e-4fe2-9e8c-244a941388f5.png",
      "/lovable-uploads/b8701b77-5f5e-435c-9cbe-9f83294c651e.png",
      "/lovable-uploads/f0e9f148-9c7c-4239-9b26-54d99ccca784.png",
      "/lovable-uploads/0a377a7f-86bd-48a8-affd-1a82ff018603.png",
      "/lovable-uploads/51321ef6-2b4b-4720-90d0-4d87c13da10c.png",
      "/lovable-uploads/176eb3a2-f7d1-495f-b42c-4ee40396d357.png",
      "/lovable-uploads/d7feb61c-ae60-4cfb-9520-66239c4912c6.png",
      "/lovable-uploads/5f920765-b70f-4dc4-b726-858a05c86f36.png",
      "/lovable-uploads/cb324df1-2449-4af0-a1a3-434db3f9782b.png",
      "/lovable-uploads/7bb8af9e-f4f0-478d-b55e-4b55c95a83b3.png",
      "/lovable-uploads/3b0645ff-ec97-423c-842d-5926c9535590.png",
      "/lovable-uploads/c2d52fcd-4a56-4cd5-88de-fdb694e4c4c4.png",
      "/lovable-uploads/e3c671b2-a99e-4162-921d-ee370e0b31f2.png",
      "/lovable-uploads/135e62ce-0279-4d09-b036-c7099aa9676b.png",
      "/lovable-uploads/afbf5e62-9033-48ed-8d05-a54b220f498a.png",
      "/lovable-uploads/81f64ee8-dd4a-4e7b-840c-c64b0c904d54.png",
      "/lovable-uploads/de5ee7a3-e803-45e3-bebd-d3f5baa43cfc.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Modern Luxury Living in Pune",
    style: "Contemporary Minimalist"
  },
  {
    id: "suraj-chavat-luxury-bedroom",
    title: "Suraj Chavat's Luxury Bedroom",
    category: "Residential",
    location: "Pune",
    size: "250 sq ft",
    completionYear: "2025",
    description: "A meticulously designed luxury bedroom that epitomizes modern elegance and personal style. The space features a sophisticated design with a crystal chandelier, marble-clad walls, and custom lighting that creates a warm, inviting atmosphere. The room incorporates a blend of neutral tones with rich accent colors, featuring plush seating, a state-of-the-art entertainment system, and personalized artwork that reflects the homeowner's personality.",
    features: [
      "Intricate ceiling design with concealed lighting",
      "Crystal chandelier as a statement piece",
      "Custom marble wall paneling",
      "Luxurious king-size bed with designer headboard",
      "Integrated smart home entertainment system",
      "Elegant sitting area with designer chairs",
      "Personalized photo artwork",
      "Sophisticated color palette with warm accents"
    ],
    images: [
      "/lovable-uploads/fc2d4e14-ce3f-4ab0-9925-3af8418ccf1c.png",
      "/lovable-uploads/11ce913b-af6f-4656-a92e-a4dcf70775f9.png",
      "/lovable-uploads/7add93ba-e971-4fef-9a11-caff92c9c443.png",
      "/lovable-uploads/f4fa52bc-7b36-48c9-bce9-85632a289c57.png",
      "/lovable-uploads/15bf770f-1251-4c88-9438-a2f6f5c3c2b0.png",
      "/lovable-uploads/f5834427-dd78-43d5-8248-9c62db020362.png",
      "/lovable-uploads/09c9804b-61ee-4ca0-b912-f48bcb4a6d3e.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Luxury Redefined in Personal Space",
    style: "Contemporary Luxe"
  },
  {
    id: "gaikwad-luxe-bungalow",
    title: "Gaikwad's Luxe Bungalow",
    category: "Residential",
    location: "Pune",
    size: "3,000 sq ft",
    completionYear: "2025",
    description: "Crafted for Mr. Gaikwad, this Pune bungalow redefines luxury living with a perfect blend of traditional Indian elements and modern sophistication. The 3,000 sq ft residence features a stunning zen garden with a bonsai centerpiece and meditation area, a modern dining space with custom lighting, and an innovative staircase design. The living spaces showcase intricate wall paneling, handcrafted floral relief work, and premium finishes throughout, creating a harmonious fusion of heritage and contemporary luxury.",
    features: [
      "Zen garden with bonsai tree and meditation space",
      "Custom-designed dining area with pendant lighting",
      "Modernist staircase with integrated planters",
      "3D floral relief wall art in white",
      "Premium wood and marble finishes",
      "Skylight features for natural illumination",
      "Elegant wall paneling with ribbed details",
      "Contemporary kitchen with built-in storage"
    ],
    images: [
      "/lovable-uploads/454a3d4a-b6c1-42b0-ad59-0832b59f5d5c.png",
      "/lovable-uploads/bf3afaa7-11d3-44f7-bacf-5c150f4af51f.png",
      "/lovable-uploads/5c104c50-65b6-4279-b365-c943f23dec2e.png",
      "/lovable-uploads/8b848d7c-d5de-4f47-a18d-f7f58b49e8de.png",
      "/lovable-uploads/c7038182-f9d3-441c-b269-77d5f66000ef.png",
      "/lovable-uploads/48cfc59c-c75e-4386-9b87-b527b87d46da.png",
      "/lovable-uploads/ef4fba5f-cb62-4b17-8d0e-ad7f85a6d26b.png",
      "/lovable-uploads/6fa9ee11-f6ae-4a28-8494-008244403acc.png",
      "/lovable-uploads/754482da-9b61-4da8-877c-f91e2f86df83.png",
      "/lovable-uploads/5398dd36-7556-4e81-977a-b70f872a8082.png",
      "/lovable-uploads/76d98c07-cb83-440f-b779-0b8ae1dcec4e.png",
      "/lovable-uploads/d3035f15-bb73-46c9-8b1b-dca9f506a620.png",
      "/lovable-uploads/deba8bfc-8b52-43b6-a38c-8908dfd5de2e.png",
      "/lovable-uploads/033c5fde-3941-4a63-921a-028a850e9a08.png",
      "/lovable-uploads/e5a507ea-54bf-44ca-bde9-f01680e1ef11.png",
      "/lovable-uploads/0ecd4d82-43b9-4dff-9940-18532c3123eb.png",
      "/lovable-uploads/eb48dfd7-2867-4f0d-b797-925e8ebd9d10.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "A Grand Retreat in Pune",
    style: "Contemporary Zen Luxury"
  },
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
    designer: "Dalpat Suthar",
    tagline: "A Timeless Home in Pune",
    style: "Warm Indian Minimalism"
  },
  {
    id: "ravi-kale-3bhk",
    title: "Ravi Kale's Modern 3BHK",
    category: "Residential",
    location: "Mumbai",
    size: "1,800 sq ft",
    completionYear: "2024",
    description: "An elegantly designed 3BHK apartment that seamlessly blends contemporary aesthetics with functional living. The space features a sophisticated master bedroom with a marble accent wall, a meticulously crafted pooja room with traditional elements, and a modern dining area with pendant lighting. Each room showcases a carefully curated design language that emphasizes clean lines, neutral color palettes, and thoughtful spatial planning.",
    features: [
      "Custom marble accent wall in master bedroom",
      "Elegant pooja room with traditional Ganesha statue",
      "Modern dining area with designer pendant lights",
      "Integrated kitchen with marble backsplash",
      "Cane and wood furniture details",
      "Neutral color palette with warm wood tones",
      "Custom ceiling designs with integrated lighting",
      "Elegant window treatments",
      "Artistic wall decor",
      "Functional and stylish storage solutions"
    ],
    images: [
      "/lovable-uploads/53e406a7-fb5c-44a0-b0c5-530a6299cc61.png",
      "/lovable-uploads/9355aa7a-d752-473d-b4fc-c3f9f7254f62.png",
      "/lovable-uploads/248904a0-be9d-4c02-b006-146265a3fc4d.png",
      "/lovable-uploads/59444e2d-0ffc-4e65-a38b-6baaf0364e98.png",
      "/lovable-uploads/8c33ab1a-d5ef-4840-b406-dcca6a50345e.png",
      "/lovable-uploads/04a59497-eba7-4d18-8377-b906c400217e.png",
      "/lovable-uploads/24bc45ca-531d-438e-b423-acec2aae9fe5.png",
      "/lovable-uploads/2f3d8ae0-f086-4b1f-907b-b0f08aba734c.png",
      "/lovable-uploads/0c969194-8d9b-4ccf-b1e6-7ff5401646e9.png",
      "/lovable-uploads/ba8fcac1-d2aa-443c-9f0f-b0db77352fd3.png",
      "/lovable-uploads/164f03ed-d4e4-431b-bc2f-a7d770452da4.png",
      "/lovable-uploads/2050285b-0a38-41a8-80ce-4beed9ba5163.png",
      "/lovable-uploads/95bc3918-c87a-4740-bb42-6916e924b963.png",
      "/lovable-uploads/366cf1dd-b4e9-42b6-bfcc-8870b7dbfd54.png",
      "/lovable-uploads/32396da3-2606-4172-aa45-a34009c7876d.png",
      "/lovable-uploads/b5081487-3cf6-41e1-b070-9de4ad65c9aa.png",
      "/lovable-uploads/5e1ae636-2c18-438c-a45d-42f563288a53.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Contemporary Elegance in Mumbai",
    style: "Modern Minimalist"
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
    designer: "Dalpat Suthar",
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
