
// Update in the featured project image section
<img 
  src={featuredProject.images[0]} 
  alt={`Fast-loading ${featuredProject.title} interior by Loveable in ${featuredProject.location}`}
  className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${
    isLoaded ? 'opacity-100' : 'opacity-0'
  }`}
  loading="eager" 
  width={1000}
  height={563}
  // Corrected to camelCase fetchPriority
  fetchPriority="high"
  decoding="sync"
  style={{
    aspectRatio: `${getFeaturedAspectRatio()}`,
    objectFit: "cover"
  }}
/>
