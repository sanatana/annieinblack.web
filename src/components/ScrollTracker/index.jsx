import { useCallback, useEffect, useRef } from 'react';

import './scroll_tracker.scss';

let scrollTrackerTimeOut = null;

const ScrollTracker = () => {
  const trackerRef = useRef();
  const trackerIndicatorRef = useRef();

  const updateScrollPercentage = useCallback(() => {
    clearTimeout(scrollTrackerTimeOut);

    scrollTrackerTimeOut = setTimeout(() => {
      if (!trackerIndicatorRef.current) {
        return;
      }

      const windowHeight = window.innerHeight;

      const totalHeight = document.documentElement.scrollHeight - windowHeight;

      if (windowHeight / 3 > totalHeight) {
        trackerIndicatorRef.current.style.display = 'none';
        return;
      }

      trackerIndicatorRef.current.style.display = 'block';

      const scrolled = window.scrollY;
      const percentage = Math.round((scrolled / totalHeight) * 100);
      trackerIndicatorRef.current.style.width = `${percentage}%`;
    }, 100);
  }, []);

  // Event listener to call the updateScrollPercentage function when scrolling
  useEffect(() => {
    window.removeEventListener('scroll', updateScrollPercentage);
    window.addEventListener('scroll', updateScrollPercentage);
    return () => {
      window.removeEventListener('scroll', updateScrollPercentage);
    };
  }, [updateScrollPercentage]);

  useEffect(() => {
    window.removeEventListener('scroll', updateScrollPercentage);
    window.addEventListener('scroll', updateScrollPercentage);

    return () => {
      window.removeEventListener('scroll', updateScrollPercentage);
    };
  }, [updateScrollPercentage]);

  return (
    <div
      ref={ trackerRef }
      className="scroll-tracker"
    ><div
        ref={ trackerIndicatorRef }
        className="scroll-tracker__indicator"
      />
    </div>
  );
};

export default ScrollTracker;
