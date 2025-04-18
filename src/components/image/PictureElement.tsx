
import { memo } from 'react';
import { ImageProps } from './types';
import { generatePlaceholderColor } from '@/utils/imageUtils';
import ImageSource from './ImageSource';
import ResponsiveImage from './ResponsiveImage';

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
      <ImageSource src={src} type="webp" />
      <ImageSource src={src} type="avif" />
      <ResponsiveImage
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        priority={priority}
        onLoad={onLoad}
        placeholderColor={placeholderColor}
      />
    </picture>
  );
});

PictureElement.displayName = "PictureElement";

export default PictureElement;
