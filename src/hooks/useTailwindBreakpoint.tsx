import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const useTailwindBreakpoint = (breakpointKey: keyof typeof breakpoints): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Obtain breakpoint width
    const minWidth = breakpoints[breakpointKey];
    
    // Create media query
    const mediaQuery = `(min-width: ${minWidth}px)`;
    const mql = window.matchMedia(mediaQuery);

    const updateMatches = () => setMatches(mql.matches);

    // Exec inicial check
    updateMatches();

    // Event listener
    mql.addEventListener('change', updateMatches);

    // Clean listener
    return () => mql.removeEventListener('change', updateMatches);
  }, [breakpointKey]);

  return matches;
};

export default useTailwindBreakpoint;