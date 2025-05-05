
export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  quality?: "low" | "medium" | "high";
  preload?: boolean;
  format?: "auto" | "webp" | "avif" | "jpeg";
  fetchPriority?: "high" | "low" | "auto";
  placeholderColor?: string;
  skipLazyLoading?: boolean;
  onLoad?: () => void;
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  blur?: boolean;
  lowQualityPlaceholder?: string;
}
