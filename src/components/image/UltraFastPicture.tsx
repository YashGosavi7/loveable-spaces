
import { memo } from 'react';
import { generateUltraOptimizedUrl, getBrowserSupport } from '@/utils/ultraFastImageOptimization';

interface UltraFastPictureProps {
  src: string;
  alt: string;
  type: 'thumbnail' | 'hero' | 'lightbox';
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
  onClick?: () => void;
  loading?: 'eager' | 'lazy';
  sizes?: string;
}

const UltraFastPicture = memo(({
  src,
  alt,
  type,
  className = '',
  width,
  height,
  priority = false,
  onClick,
  loading = 'lazy',
  sizes
}: UltraFastPictureProps) => {
  const support = getBrowserSupport();
  
  // Generate optimized URLs for all formats
  const avifUrl = generateUltraOptimizedUrl(src, type, 'avif');
  const webpUrl = generateUltraOptimizedUrl(src, type, 'webp');
  const jpegUrl = generateUltraOptimizedUrl(src, type, 'jpeg');
  
  // Generate responsive srcSet for each format
  const generateSrcSet = (format: 'avif' | 'webp' | 'jpeg') => {
    const baseUrl = generateUltraOptimizedUrl(src, type, format);
    
    if (type === 'thumbnail') {
      return `${baseUrl}&w=250 250w, ${baseUrl}&w=350 350w, ${baseUrl}&w=500 500w`;
    } else if (type === 'hero') {
      return `${baseUrl}&w=600 600w, ${baseUrl}&w=1200 1200w, ${baseUrl}&w=1800 1800w`;
    }
    
    return baseUrl;
  };
  
  // Determine optimal sizes attribute
  const optimalSizes = sizes || (
    type === 'thumbnail' 
      ? '(max-width: 768px) 250px, (max-width: 1024px) 350px, 500px'
      : type === 'hero'
      ? '(max-width: 768px) 600px, 1200px'
      : '100vw'
  );
  
  return (
    <picture className="w-full h-full">
      {/* AVIF - Best compression for modern browsers */}
      {support.avif && (
        <source
          type="image/avif"
          srcSet={generateSrcSet('avif')}
          sizes={optimalSizes}
        />
      )}
      
      {/* WebP - Good compression with wide support */}
      {support.webp && (
        <source
          type="image/webp"
          srcSet={generateSrcSet('webp')}
          sizes={optimalSizes}
        />
      )}
      
      {/* JPEG fallback */}
      <source
        type="image/jpeg"
        srcSet={generateSrcSet('jpeg')}
        sizes={optimalSizes}
      />
      
      <img
        src={jpegUrl}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onClick={onClick}
        style={{
          aspectRatio: `${width}/${height}`,
          objectFit: 'cover',
          willChange: onClick ? 'transform' : 'auto'
        }}
      />
    </picture>
  );
});

UltraFastPicture.displayName = "UltraFastPicture";

export default UltraFastPicture;
