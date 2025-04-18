
import { memo } from 'react';
import { ImageProps } from './types';
import { generatePlaceholderColor } from '@/utils/imageUtils';

interface PictureElementProps extends ImageProps {
  onLoad: () => void;
}

const PictureElement = memo(({ 
  src, 
  alt, 
  className = '',
  width = 800,
  height = 600,
  priority = false,
  onLoad,
}: PictureElementProps) => {
  const placeholderColor = generatePlaceholderColor(src);

  return (
    <picture>
      <source 
        type="image/webp" 
        srcSet={`${src} 250w, ${src} 500w`} 
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      <source 
        type="image/avif" 
        srcSet={`${src} 250w, ${src} 500w`} 
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      <source 
        media="(max-width: 640px)" 
        srcSet={src}
      />
      <source 
        media="(max-width: 1024px)" 
        srcSet={src}
      />
      
      <img 
        src={src} 
        alt={alt} 
        className={className}
        loading={priority ? "eager" : "lazy"}
        onLoad={onLoad}
        width={width}
        height={height}
        style={{ 
          backgroundColor: placeholderColor,
          aspectRatio: `${width}/${height}` 
        }}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
});

PictureElement.displayName = "PictureElement";

export default PictureElement;

