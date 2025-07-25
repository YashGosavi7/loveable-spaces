

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
  // Add missing properties
  challenges?: string;
  solutions?: string;
  materials?: string[];
  testimonial?: {
    content: string;
    author: string;
  };
  websiteUrl?: string;
  area?: string;
  completionDate?: string;
  budget?: string;
  client?: string;
}

const projectsData: Project[] = [
  {
    id: "7-treats-hotel",
    title: "7 Treats Hotel & Restaurant",
    category: "Hospitality",
    location: "Pune",
    size: "8,000 sq ft",
    completionYear: "2025",
    description: "7 Treats Hotel & Restaurant is a contemporary hospitality project that seamlessly blends modern design with warm, inviting atmospheres. The space features distinctive green wall branding, innovative rope lighting installations, geometric mirror patterns, and a sophisticated bar area with premium bottle displays. The interior showcases a multi-level dining experience with unique ceiling installations including suspended umbrellas, custom lighting fixtures, and luxurious booth seating arrangements that create intimate dining spaces.",
    features: [
      "Signature green moss wall with illuminated branding",
      "Innovative rope chandelier lighting installation",
      "Premium bar area with extensive bottle display shelving",
      "Multi-level dining areas with staircase access",
      "Suspended umbrella ceiling art installation",
      "Geometric mirror pattern entrance doors",
      "Luxurious booth seating with tufted leather upholstery",
      "Custom wooden slat partitions for privacy",
      "Modern pendant lighting throughout dining areas",
      "Industrial-style exposed brick and concrete elements",
      "Professional beverage refrigeration systems",
      "Custom-designed bar counter with blue accent lighting",
      "Atmospheric mood lighting for evening ambiance",
      "Contemporary furniture with warm color palette"
    ],
    images: [
      "/lovable-uploads/3e7a2912-4391-41d3-bb62-dc9bffe91097.png",
      "/lovable-uploads/0c54242c-0951-4aca-8dc9-211f62ff3743.png",
      "/lovable-uploads/75a49130-e865-4608-a92f-653b27501a0e.png",
      "/lovable-uploads/8324a4c4-da7a-4d06-a451-a2cc011b524c.png",
      "/lovable-uploads/da6cb2df-c536-48c7-aad4-ab35930b2ef6.png",
      "/lovable-uploads/b0e57557-724d-403d-b8f4-8694603e3685.png",
      "/lovable-uploads/be463abd-3882-441b-aceb-fb881635ad00.png",
      "/lovable-uploads/9d7bfe23-0735-4f48-8c6b-f4bfb0bc5f7d.png",
      "/lovable-uploads/99eda4a6-9e1b-4000-a931-99225664ceef.png",
      "/lovable-uploads/c23ea679-df2c-4755-b365-ec8e02967e59.png",
      "/lovable-uploads/26f56ced-b138-44b3-82c2-5030197b7227.png",
      "/lovable-uploads/de18c82a-4026-4b93-9c1b-33bf266ad518.png",
      "/lovable-uploads/255c31d8-46c6-4194-b858-96a4600a59ba.png",
      "/lovable-uploads/1a7d9e96-4207-4fe3-a050-49a9e1895561.png",
      "/lovable-uploads/d75e4538-24df-454a-9d08-e8daf9063dd4.png",
      "/lovable-uploads/8ac0794f-dbe8-47cd-a73b-7963cd1833da.png",
      "/lovable-uploads/8d602f62-ab6a-440e-b859-9a656e913b5e.png",
      "/lovable-uploads/4958375c-b2d7-4673-ab92-264801eed3b2.png",
      "/lovable-uploads/f1e74533-1563-4433-9753-c3ab1f79bd7d.png",
      "/lovable-uploads/b2120be6-3cbc-46e7-bb9f-a67a0643c56f.png",
      "/lovable-uploads/443a83a0-5135-4aee-b701-2cc8e9a80081.png",
      "/lovable-uploads/d7664f0c-167c-49ef-beb1-96ebf5a57964.png",
      "/lovable-uploads/109de074-752e-4895-86a7-843037ba787d.png",
      "/lovable-uploads/498493dc-bfd1-420f-a922-9a22efcb69d1.png",
      "/lovable-uploads/ce957a7f-8ed1-40eb-9561-735f1cb5d598.png",
      "/lovable-uploads/6f6d22e5-46be-4377-92d7-ff57e9408f15.png",
      "/lovable-uploads/84a3f9db-4081-4c84-9950-8efd2bffbe12.png",
      "/lovable-uploads/1b2428f8-3cbe-4e28-b02a-e5c4cd833239.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Contemporary Hospitality with Distinctive Character",
    style: "Modern Industrial Hospitality",
    challenges: "Creating a cohesive design across multiple levels while maintaining the restaurant's unique branding and ensuring optimal flow for both casual dining and premium experiences.",
    solutions: "We integrated signature design elements throughout all levels, used consistent lighting themes, and created distinct zones that maintain visual connectivity while offering varied dining experiences.",
    materials: [
      "Artificial green moss wall coverings",
      "Rope and industrial lighting fixtures",
      "Tufted leather booth seating",
      "Geometric mirror panels",
      "Premium wood slat partitions",
      "Industrial exposed brick and concrete",
      "Custom metalwork for bar fixtures",
      "Professional-grade bar equipment"
    ],
    testimonial: {
      content: "Balaji Design Studio transformed our vision into a remarkable dining destination. The multi-level design and unique lighting installations have made 7 Treats a standout venue that perfectly balances modern aesthetics with functional hospitality design.",
      author: "7 Treats Management Team"
    },
    area: "8,000 sq ft"
  },
  {
    id: "dada-rao-danve-project",
    title: "Patil Bada - Dada Rao Danve Project",
    category: "Hospitality",
    location: "Pune",
    size: "15,000 sq ft",
    completionYear: "2025",
    description: "Patil Bada is a traditional-style hospitality complex designed for Dada Rao Danve that celebrates India's rich cultural heritage. The project features distinctive vernacular architecture with terracotta roofing, decorative wooden elements, and traditional Warli art motifs. The venue includes an open-air dining area, kids' play zone, garden seating, and custom wooden architectural elements that create a warm, authentic atmosphere. The thoughtfully designed spaces combine modern amenities with traditional aesthetics, offering visitors an immersive cultural experience set against a serene natural backdrop.",
    features: [
      "Traditional vernacular architecture with terracotta tiled roofs",
      "Ornate wooden cart wheel wall displays and decorative elements",
      "Custom wooden archway with greenery and traditional signage",
      "Outdoor dining area with panoramic views",
      "Indoor dining hall with traditional Warli art mural wall",
      "Children's play area with colorful play equipment",
      "Decorative jaali screens and lattice work",
      "Traditional wooden doors and windows with arched details",
      "Landscaped gardens with indigenous plants and flowers",
      "Decorative water features and zen elements",
      "Ample parking space with designated areas",
      "Traditional 'palkhi' style entrance with wooden detailing"
    ],
    images: [
      "/lovable-uploads/15500acb-82c4-4b93-ae30-ac0cd08c8c62.png",
      "/lovable-uploads/a3531e4d-26b9-4b54-a2aa-d7fa49047634.png",
      "/lovable-uploads/78ff940c-ca6d-473d-bf90-e12ec4a7defa.png",
      "/lovable-uploads/c5d5dd11-5bfb-4796-9afc-a42c876a908a.png",
      "/lovable-uploads/0d499c04-ffd7-4472-bdf5-db0f05414ec1.png",
      "/lovable-uploads/3a6d2a02-fb4e-4349-9a2c-83ffe9bb944a.png",
      "/lovable-uploads/996a51e7-d737-42de-8455-9632bc75acd5.png",
      "/lovable-uploads/2cf384df-fc36-4e44-ac0e-e0a6ccbf4a1b.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Traditional Elegance Meets Modern Hospitality",
    style: "Indo-Vernacular",
    challenges: "The project required balancing authentic traditional aesthetics with modern hospitality requirements while working with limited local resources for specialized craftsmanship.",
    solutions: "We collaborated with local artisans to create authentic vernacular elements, utilized sustainable materials, and designed modular components that could be crafted by local carpenters while maintaining traditional aesthetics.",
    materials: [
      "Terracotta roof tiles",
      "Hand-carved wooden elements",
      "Natural stone flooring",
      "Traditional jaali work",
      "Custom wooden furniture",
      "Reclaimed wooden wheels and artifacts",
      "Indigenous plants for landscaping",
      "Handcrafted Warli art murals"
    ],
    testimonial: {
      content: "Balaji Design Studio captured the essence of our vision for a traditional yet functional hospitality space. The attention to cultural details while ensuring modern comfort has resulted in a venue that truly represents our heritage.",
      author: "Dada Rao Danve, Project Owner"
    },
    area: "15,000 sq ft"
  },
  {
    id: "utture-3bhk-apartment",
    title: "Mr. Utture's Modern 3BHK",
    category: "Residential",
    location: "Pune",
    size: "2,000 sq ft",
    completionYear: "2025",
    description: "A contemporary 3BHK apartment designed for Mr. Utture that harmoniously blends modern aesthetics with functional spaces. The design features a sophisticated master bedroom with a unique concentric circle wall feature, custom-designed storage solutions, and a charming kids' room with a loft bed. Notable elements include a music-themed wardrobe with artistic musical note details, premium white wardrobes with sleek handles, and a dedicated study area with modern amenities.",
    features: [
      "Concentric circle feature wall with integrated lighting",
      "Custom music-themed wardrobe with artistic details",
      "Full-height wardrobes with premium finishes",
      "Kids' bedroom with custom loft bed and play area",
      "Dedicated study space with built-in workstation",
      "Elegant botanical artwork in master bedroom",
      "Premium wooden flooring throughout",
      "Modern ceiling-mounted AC units",
      "Built-in entertainment unit with floating shelves",
      "Space-saving storage solutions",
      "Contemporary furniture with neutral upholstery",
      "Layered lighting design for ambiance"
    ],
    images: [
      "/lovable-uploads/021b077a-92b2-4e2b-ac51-75d2fc3bf20e.png",
      "/lovable-uploads/308a8036-5167-4e94-ace6-d5bdfc9677a9.png",
      "/lovable-uploads/ab3194a4-24e2-4d27-9ab1-696bf2762efa.png",
      "/lovable-uploads/6eadeff7-5c3f-4791-9428-375df057e460.png",
      "/lovable-uploads/8929c4d3-15f0-44b4-be01-131f3cbfc072.png",
      "/lovable-uploads/dc389068-ad82-416c-9250-52670dafe493.png",
      "/lovable-uploads/3213f901-17eb-4fd5-ac59-c4264b91cc51.png",
      "/lovable-uploads/9f82ba0d-7976-4582-8542-b6feda6861c2.png",
      "/lovable-uploads/4628e43d-7137-4b66-acc6-3210b6e099af.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Modern Living with Musical Flair",
    style: "Contemporary Minimalist"
  },
  {
    id: "golden-leaf-banquet-hall",
    title: "The Golden Leaf Banquet Hall",
    category: "Hospitality",
    location: "Kunjirwadi, Pune",
    size: "10,000 sq ft",
    completionYear: "2025",
    description: "The Golden Leaf Banquet Hall in Kunjirwadi, Pune, epitomizes classical elegance with its striking neoclassical architecture. The venue features majestic lion sculptures, ornate columns, and a grand entrance adorned with classical statues. The interior showcases crystal chandeliers, premium marble flooring with geometric patterns, and bespoke seating areas. Notable elements include a decorative fountain with pelican sculptures, gold-accented wall sconces, and a meticulously detailed reception area with walnut wood paneling.",
    features: [
      "Neoclassical architectural design with ornate columns and arches",
      "Lion and classical statue sculptures at entrance",
      "Crystal chandelier installations in reception area",
      "Custom marble flooring with geometric patterns",
      "Decorative fountain with pelican sculptures",
      "Gold-accented wall sconces and lighting fixtures",
      "Bespoke seating areas with striped upholstery",
      "Walnut wood paneling with gold details",
      "Landscaped entrance with palm trees",
      "Premium marble reception counter"
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
      "/lovable-uploads/e6e7be2a-5cb9-4696-830b-ec8880f338eb.png",
      "/lovable-uploads/90ba60fa-2f18-45bd-8258-3027706b3e34.png",
      "/lovable-uploads/cd4ff427-a2a0-4f40-ab3f-d652e947309a.png",
      "/lovable-uploads/50766ba2-0832-4e3b-b0e6-918993ebcf5c.png",
      "/lovable-uploads/f702f23a-64b8-4c3c-9a24-9ef29422454f.png",
      "/lovable-uploads/20990b92-00f5-42b5-a5fc-1cbedc2bdc85.png",
      "/lovable-uploads/1e520620-9d9d-40ae-973f-188390810757.png",
      "/lovable-uploads/0739ef1d-2f3c-4cd2-8772-aa0ef290086f.png",
      "/lovable-uploads/dbdac05c-5729-458c-9cc1-821b7cde53d8.png",
      "/lovable-uploads/7eef5f5b-3789-4990-a1ea-c622dd00bce6.png",
      "/lovable-uploads/fd05fdd8-89e5-44e0-9415-669c442db39f.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Classical Elegance in Pune",
    style: "Neoclassical Luxury"
  },
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
    description: "An elegantly designed 3BHK apartment that seamlessly blends contemporary aesthetics with functional living. The space features sophisticated bedroom designs with unique architectural elements, including textured wall panels, integrated workspaces, and carefully curated lighting. Each room showcases a modern minimalist approach with warm neutral tones, innovative storage solutions, and thoughtful spatial planning that maximizes both style and functionality.",
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
      "Functional and stylish storage solutions",
      "Unique architectural wall panels",
      "Integrated workspace with bulletin board",
      "Sophisticated lighting design",
      "Minimalist yet warm interior design"
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
      "/lovable-uploads/5e1ae636-2c18-438c-a45d-42f563288a53.png",
      "/lovable-uploads/8aa6ea8f-3ad8-41b7-8afe-6ef05a9a11c7.png",
      "/lovable-uploads/081379a4-fca0-4432-a721-27e5451557ff.png",
      "/lovable-uploads/737f1abd-364f-4936-834b-1f7b893df4fc.png",
      "/lovable-uploads/4847c6b9-d0a1-4f73-a5a3-638aab07f221.png",
      "/lovable-uploads/aa20a76e-dc46-4f58-953a-8b65e51aae94.png",
      "/lovable-uploads/1e6f3006-f658-45b6-bef6-19552dd6c517.png",
      "/lovable-uploads/d0d2a8e8-964f-4cb9-9ccf-0cd2d20410bc.png",
      "/lovable-uploads/1070561d-9c51-4a4e-bbaa-542d99e198e1.png",
      "/lovable-uploads/e458768f-34c4-42f0-a193-6352689a4f5c.png",
      "/lovable-uploads/933cc55d-1a94-4bfb-a6b4-b9ef58c1a81c.png",
      "/lovable-uploads/7376f411-be9d-4aa1-ba87-dd81c60da67c.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Contemporary Elegance in Mumbai",
    style: "Modern Minimalist"
  },
  {
    id: "park-infinia",
    title: "Park Infinia Temple",
    category: "Hospitality",
    location: "Pune",
    size: "2,500 sq ft",
    completionYear: "2025",
    description: "Park Infinia's temple stands as a testament to architectural grandeur, featuring a stunning pavilion crowned with an iconic saffron flag. The design incorporates traditional Indian architectural elements with modern aesthetics, including ornate Gothic arches, decorative lamp posts, and an elevated platform surrounded by vibrant floral gardens. The structure's dramatic lighting creates a mesmerizing ambiance during sunset, while the intricate wrought iron railings and illuminated steps add to its majestic presence.",
    features: [
      "Traditional pavilion with Gothic-inspired arches",
      "Iconic saffron flag installation",
      "Elevated platform with grand staircase",
      "Ornate wrought iron railings and gates",
      "Decorative vintage-style lamp posts",
      "Dual-colored floral gardens",
      "Strategic architectural lighting",
      "Stone construction with detailed craftsmanship",
      "Panoramic viewing areas",
      "Custom-designed temple spire"
    ],
    images: [
      "/lovable-uploads/875c7a27-7a75-4636-8653-a6ae823e8487.png",
      "/lovable-uploads/d604159a-0d3f-44a4-bc9b-e44c1b3dc609.png"
    ],
    isFeatured: true,
    designer: "Dalpat Suthar",
    tagline: "Where Heritage Meets Harmony",
    style: "Indo-Gothic Revival"
  }
];

export default projectsData;

