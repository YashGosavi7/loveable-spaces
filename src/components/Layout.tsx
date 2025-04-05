
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Lower threshold to make header change sooner for better visibility
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

  // Reduce padding to ensure hero section is fully visible without scrolling
  return (
    <div className="min-h-screen flex flex-col">
      <Header isScrolled={isScrolled} />
      <main className="flex-grow pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
