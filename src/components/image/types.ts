
export interface ImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  preload?: boolean;
  quality?: "low" | "medium" | "high";
  blurHash?: string;
  skipLazyLoading?: boolean;
  onLoad?: () => void;
  placeholderColor?: string;
  format?: "auto" | "webp" | "avif" | "jpeg";
  srcSet?: string;
  loading?: "eager" | "lazy";
  autoUpscale?: boolean;
  renderAtBreakpoints?: boolean;
  fetchPriority?: "high" | "low" | "auto";
}
