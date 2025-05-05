
interface ImagePreloaderProps {
  imagePaths: string[];
  preloadedIndices: number[];
}

const ImagePreloader = ({ imagePaths, preloadedIndices }: ImagePreloaderProps) => {
  return (
    <div className="hidden" aria-hidden="true">
      {preloadedIndices.map(index => (
        imagePaths[index] && (
          <link 
            key={`preload-gallery-${index}`}
            rel="prefetch" 
            href={imagePaths[index]} 
            as="image"
          />
        )
      ))}
    </div>
  );
};

export default ImagePreloader;
