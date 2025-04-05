
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Lower threshold to make header change sooner for better visibility with larger logo
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Add more padding to the top of the main content to prevent overlap with the larger logo
  return (
    <div className="min-h-screen flex flex-col">
      <Header isScrolled={isScrolled} />
      <main className="flex-grow pt-32 md:pt-48 lg:pt-64">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
