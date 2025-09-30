import { ZoomControl } from 'react-leaflet';
import React from 'react';
import { useTailwindBreakpoint } from './useTailwindBreakpoint'; // Asegúrate de ajustar la ruta

export const ConditionalZoomControls: React.FC = () => {
  const isXl = useTailwindBreakpoint('xl'); 
  
  if (isXl) {
    return <ZoomControl position="topright" />;
  }

  return <ZoomControl position="bottomleft" />;
};