
import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 sticky top-[140px] md:top-[156px] z-[800] bg-warmWhite/95 backdrop-blur-sm py-4">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          className={`px-4 py-2 text-sm md:text-base rounded-md transition-colors ${
            activeCategory === category
              ? "bg-roseGold text-white"
              : "bg-lightGray/20 text-darkGray hover:bg-lightGray/40"
          }`}
          onClick={() => setActiveCategory(category)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
