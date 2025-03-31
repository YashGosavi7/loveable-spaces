
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

const SectionTitle = ({ title, subtitle, center = false, light = false }: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className={`font-playfair text-3xl md:text-4xl font-semibold mb-4 ${light ? 'text-white' : 'text-darkGray'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg ${light ? 'text-white/80' : 'text-darkGray/80'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
