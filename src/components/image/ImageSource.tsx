
import { memo } from 'react';

interface ImageSourceProps {
  src: string;
  type: 'webp' | 'avif';
}

const ImageSource = memo(({ src, type }: ImageSourceProps) => (
  <>
    <source 
      type={`image/${type}`} 
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
  </>
));

ImageSource.displayName = "ImageSource";

export default ImageSource;
