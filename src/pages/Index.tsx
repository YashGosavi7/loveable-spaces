
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warmWhite">
      <div className="text-center">
        <h1 className="text-4xl font-playfair font-bold mb-4 text-darkGray">Lovable Interior Design</h1>
        <p className="text-xl text-darkGray/80 mb-6">Premium interior design services starting at 15k</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/portfolio" 
            className="px-6 py-3 bg-roseGold/90 text-white rounded hover:bg-roseGold transition-colors"
          >
            View Our Portfolio
          </Link>
          <Link 
            to="/contact" 
            className="px-6 py-3 border border-roseGold/90 text-roseGold/90 rounded hover:bg-roseGold/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
