import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

interface MapCenterTrackerProps {
  initialCoords: { lat: number; lng: number };
  onCenterChange: (lat: number, lng: number) => void;
}

const MapCenterTracker = ({ initialCoords, onCenterChange }: MapCenterTrackerProps) => {
  const [center, setCenter] = useState({ lat: initialCoords.lat, lng: initialCoords.lng });

  useMapEvents({
    moveend: (e) => {
      const newCenter = e.target.getCenter();
      setCenter({ lat: newCenter.lat, lng: newCenter.lng });
      onCenterChange(newCenter.lat, newCenter.lng);
    },
  });

  useEffect(() => {
    // On first load
    onCenterChange(center.lat, center.lng);
  }, []);

  return null;
};

export default MapCenterTracker;
