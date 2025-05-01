
interface ProjectCardInfoProps {
  title: string;
  category: string;
  location: string;
  designer?: string;
  tagline?: string;
}

const ProjectCardInfo = ({
  title,
  category,
  location,
  designer,
  tagline
}: ProjectCardInfoProps) => {
  return (
    <div className="mt-4 px-1">
      <h3 className="font-playfair text-lg md:text-xl text-darkGray">
        {title}
      </h3>
      <p className="text-darkGray/80 text-sm md:text-base">
        {category} | {location}
        {designer && ` | Designed by ${designer}`}
      </p>
      {tagline && (
        <p className="text-roseGold/90 text-xs md:text-sm mt-1 italic">
          {tagline}
        </p>
      )}
    </div>
  );
};

export default ProjectCardInfo;
