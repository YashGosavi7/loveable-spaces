
interface TeamMemberProps {
  name: string;
  title: string;
  bio: string;
  image: string;
}

const TeamMember = ({ name, title, bio, image }: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-48 h-48 rounded-full overflow-hidden mb-6 bg-lightGray">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-playfair text-xl mb-1">{name}</h3>
      <p className="text-roseGold font-medium mb-3">{title}</p>
      <p className="text-darkGray/80 max-w-sm">{bio}</p>
    </div>
  );
};

export default TeamMember;
