
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warmWhite py-12 px-4">
      <div className="text-center max-w-md">
        <h1 className="font-playfair text-4xl md:text-5xl text-darkGray mb-6">Page Not Found</h1>
        <p className="text-lg text-darkGray/80 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
