
import { useState, useEffect } from "react";

interface CityScrollAnimationProps {
  pauseOnHover?: boolean;
  direction?: "ltr" | "rtl";
  speed?: "slow" | "medium" | "fast";
}

const CityScrollAnimation = ({ 
  pauseOnHover = true, 
  direction = "rtl", 
  speed = "medium" 
}: CityScrollAnimationProps) => {
  const [isPaused, setIsPaused] = useState(false);
  
  const cities = [
    "Mumbai", "Pune", "Latur", "Solapur", "Hyderabad", 
    "Bangalore", "Delhi", "Kolkata", "Chennai"
  ];
  
  const speedValue = {
    slow: "30s",
    medium: "20s",
    fast: "10s"
  };
  
  const animationDuration = speedValue[speed];
  const animationDirection = direction === "ltr" ? "normal" : "reverse";
  
  return (
    <div className="w-full overflow-hidden text-white bg-darkGray/40 py-3">
      <div className="flex items-center justify-center">
        {/* We duplicate the cities to create seamless looping */}
        <div 
          className={`inline-flex whitespace-nowrap`}
          style={{
            animation: `scroll ${animationDuration} linear infinite ${animationDirection}`,
            animationPlayState: isPaused ? "paused" : "running"
          }}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
          {cities.map((city, index) => (
            <span key={`city-1-${index}`} className="mx-8 text-xl font-medium">
              {city}
            </span>
          ))}
          {cities.map((city, index) => (
            <span key={`city-2-${index}`} className="mx-8 text-xl font-medium">
              {city}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityScrollAnimation;
