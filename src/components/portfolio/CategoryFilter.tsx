
interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map(category => (
        <button
          key={category}
          className={`px-6 py-3 rounded-full transition-colors ${
            activeCategory === category
              ? "bg-roseGold/90 text-white"
              : "bg-lightGray/20 text-darkGray hover:bg-lightGray/40"
          }`}
          onClick={() => setActiveCategory(category)}
          aria-label={`View ${category} projects`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
