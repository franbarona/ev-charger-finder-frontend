import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useBounds } from '../context/BoundContext';

const MyMapInitializer = () => {
  const map = useMap();
  const { setBounds } = useBounds();

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
