import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { MapBounds } from '../types/types';

interface MapInitializerProps {
  setBounds: (bounds: MapBounds) => void;
}

const MyMapInitializer: React.FC<MapInitializerProps> = ({setBounds}) => {
  const map = useMap();

  useEffect(() => {
    const bounds = map.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    setBounds({
      minLat: southWest.lat,
      minLng: southWest.lng,
      maxLat: northEast.lat,
      maxLng: northEast.lng,
    });

  }, [map]);

  return null;
}

export default MyMapInitializer;
