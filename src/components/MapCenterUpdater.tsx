import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapCenterUpdaterProps {
  lat: number;
  lng: number;
}

const MapCenterUpdater: React.FC<MapCenterUpdaterProps> = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), {
      animate: true,
    });
  }, [lat, lng, map]);

  return null;
};

export default MapCenterUpdater;
