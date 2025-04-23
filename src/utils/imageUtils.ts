
// Function to detect if the user is likely on a slow connection
export const isLikelySlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Check if the browser supports the Connection API
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    
    if (conn) {
      if (conn.saveData) return true;
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
      if (conn.effectiveType === '3g') return true;
      if (conn.downlink < 1.5) return true;
    }
  }
  
  // For users in India (simplified approach using timezone)
  const isLikelyInIndia = () => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timeZone.includes('Asia/Kolkata') || timeZone.includes('Asia/Calcutta');
    } catch (e) {
      return false;
    }
  };
  
  // Be conservative for users in India
  if (isLikelyInIndia()) {
    return true;
  }
  
  return false;
};

// Generate placeholder color based on image path
export const generatePlaceholderColor = (src: string): string => {
  if (!src) return '#E0E0E0';
  
  // Generate a consistent color based on the string hash
  const hash = src.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Create a light warm color in the brand palette
  const r = 224 + (hash % 16);
  const g = 216 + (hash % 16);
  const b = 216 + (hash % 20);
  
  return `rgb(${r}, ${g}, ${b})`;
};
