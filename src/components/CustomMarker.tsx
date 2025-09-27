import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface CustomMarkerProps {
  position: {
    lat: number;
    lng: number;
  };
}

const customIcon = L.divIcon({
  className: '',
  html: `
    <div class="relative w-6 h-8 flex flex-col items-center justify-start">
      <div class="w-6 h-6 bg-blue-600 rounded-full shadow-lg z-10"></div>
      <div class="w-0 h-0 border-l-10 border-r-10 border-t-[12px] border-l-transparent border-r-transparent border-t-blue-600 -mt-1 z-0"></div>
    </div>
  `,
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -32],
});

const CustomMarker: React.FC<CustomMarkerProps> = ({ position }) => {
  return <Marker position={position} icon={customIcon} />;
};

export default CustomMarker;
