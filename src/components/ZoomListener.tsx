import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

interface ZoomListenerProps {
  onZoomChange: (zoom: number) => void;
}

const ZoomListener: React.FC<ZoomListenerProps> = ({ onZoomChange }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      const zoom = map.getZoom();
      onZoomChange(zoom);
    };

    map.on('zoomend', handleZoom);
    // handleZoom(); // Inicializa con el zoom actual

    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, onZoomChange]);

  return null;
};

export default ZoomListener;
