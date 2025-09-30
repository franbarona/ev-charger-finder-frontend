import { useState, useEffect } from 'react';

// Define tus breakpoints de Tailwind (los valores por defecto)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useTailwindBreakpoint = (breakpointKey: keyof typeof breakpoints): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Obtiene el ancho del breakpoint
    const minWidth = breakpoints[breakpointKey];
    
    // Crea la media query
    const mediaQuery = `(min-width: ${minWidth}px)`;
    const mql = window.matchMedia(mediaQuery);

    const updateMatches = () => setMatches(mql.matches);

    // Ejecuta la verificación inicial
    updateMatches();

    // Escucha los cambios
    mql.addEventListener('change', updateMatches);

    // Limpia el listener
    return () => mql.removeEventListener('change', updateMatches);
  }, [breakpointKey]);

  return matches;
};