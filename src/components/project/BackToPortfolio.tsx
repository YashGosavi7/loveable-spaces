
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const BackToPortfolio = () => {
  return (
    <section className="bg-warmWhite py-12 border-t border-lightGray/30">
      <div className="container mx-auto">
        <Link to="/portfolio" className="inline-flex items-center group text-lg">
          <ChevronLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    </section>
  );
};

export default BackToPortfolio;
