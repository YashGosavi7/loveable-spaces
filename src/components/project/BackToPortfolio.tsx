
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const BackToPortfolio = () => {
  return (
    <section className="bg-warmWhite py-12 border-t border-lightGray/30 mandala-pattern-bg">
      <div className="container mx-auto">
        <Link 
          to="/portfolio" 
          className="inline-flex items-center group text-lg"
          aria-label="Return to portfolio page"
        >
          <ChevronLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>
        
        <div className="mt-8 text-center text-darkGray/70 text-sm">
          <p>Loveable Interiors • Founded 2012 by Dalaram Suthar • 600+ Projects Across Tier 1 Cities • Starting at ₹15k</p>
          <p className="mt-2 font-playfair italic">Designing Spaces You'll Love to Live In</p>
        </div>
      </div>
    </section>
  );
};

export default BackToPortfolio;
