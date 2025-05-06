
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  preload?: boolean;
  quality?: "low" | "medium" | "high";
  skipLazyLoading?: boolean;
  placeholderColor?: string;
  format?: "auto" | "webp" | "avif" | "jpeg";
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  blur?: boolean;
  onLoad?: () => void;
}

export interface PictureSourceProps {
  src: string;
  format: "webp" | "avif" | "jpeg";
  sizes?: string;
  media?: string;
  width?: number;
  height?: number;
}
