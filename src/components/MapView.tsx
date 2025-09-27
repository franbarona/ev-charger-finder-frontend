import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import ChargingStationsMarkers from './ChargingStationsMarkers';
import MapCenterUpdater from './MapCenterUpdater';
import type { ChargingStation } from '../types/types';
import MapCenterTracker from './MapCenterTracker';

interface MapViewProps {
  position: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  chargingStations: ChargingStation[]
  setMapCoords: (coords: { lat: number; lng: number }) => void;
}

const MapView: React.FC<MapViewProps> = ({ position, zoom = 13, chargingStations, setMapCoords }) => {
  return (
    <div className="w-full h-full relative z-0">
      <MapContainer center={position} zoom={zoom} className="w-full h-full" scrollWheelZoom zoomControl={false}>
        <MapCenterUpdater lat={position.lat} lng={position.lng} />
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url={`https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`}
        />

        <ChargingStationsMarkers stations={chargingStations} />
        <ZoomControl position="topright" />
        <MapCenterTracker initialCoords={position} onCenterChange={(lat, lng) => {
          setMapCoords({ lat, lng });
        }} />
      </MapContainer>
    </div>
  );
};

export default MapView;