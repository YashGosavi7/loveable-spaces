
import { useRef, useState } from 'react';

interface SwipeHandlers {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
  preventDefaultTouchmoveEvent?: boolean;
  trackMouse?: boolean;
}

export const useSwipeable = ({
  onSwipedLeft,
  onSwipedRight,
  onSwipedUp,
  onSwipedDown,
  preventDefaultTouchmoveEvent = false,
  trackMouse = false,
}: SwipeHandlers) => {
  const touchStart = useRef({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  
  // Minimum distance to be considered a swipe (in pixels)
  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const { clientX, clientY } = 'touches' in e 
      ? e.touches[0] 
      : (trackMouse ? e : { clientX: 0, clientY: 0 });
      
    touchStart.current = { x: clientX, y: clientY };
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;
    if (preventDefaultTouchmoveEvent && 'touches' in e) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;

    const { clientX, clientY } = 'changedTouches' in e 
      ? e.changedTouches[0] 
      : (trackMouse ? e : { clientX: 0, clientY: 0 });
    
    const deltaX = clientX - touchStart.current.x;
    const deltaY = clientY - touchStart.current.y;
    
    // Calculate absolute values for distance comparison
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    // Check if it's a horizontal swipe (|deltaX| > |deltaY|)
    if (absX > absY && absX > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        onSwipedRight && onSwipedRight();
      } else {
        onSwipedLeft && onSwipedLeft();
      }
    } 
    // Check if it's a vertical swipe (|deltaY| > |deltaX|)
    else if (absY > absX && absY > SWIPE_THRESHOLD) {
      if (deltaY > 0) {
        onSwipedDown && onSwipedDown();
      } else {
        onSwipedUp && onSwipedUp();
      }
    }
    
    setIsSwiping(false);
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: trackMouse ? handleTouchStart : undefined,
    onMouseMove: trackMouse ? handleTouchMove : undefined,
    onMouseUp: trackMouse ? handleTouchEnd : undefined,
  };
};
