import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import ChargingStationsMarkers from './ChargingStationsMarkers';
import MapCenterUpdater from './MapCenterUpdater';
import MyMapInitializer from './MapInitializer';
import { ConditionalZoomControls } from './ConditionalZoomControls';
import type { ChargingStation, Coordinates, MapBounds } from '../types/types';

interface MapViewProps {
  stations: ChargingStation[];
  position: Coordinates;
  setMapCoords: (coords: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  setBounds: (bounds: MapBounds) => void;
  initialZoom?: number;
}

const MapView: React.FC<MapViewProps> = ({ stations, position, setMapCoords, setZoom, setBounds, initialZoom = 13 }) => {

  const MapEvents = () => {
    const map = useMapEvents({
      zoom: () => {
        setZoom(map.getZoom());
      },
      moveend: () => {
        const bounds = map.getBounds();
        const center = map.getCenter();
        setMapCoords({ lat: center.lat, lng: center.lng });
        const southWest = bounds.getSouthWest();
        const northEast = bounds.getNorthEast();

        setBounds({
          minLat: southWest.lat,
          minLng: southWest.lng,
          maxLat: northEast.lat,
          maxLng: northEast.lng,
        });
      },
    });

    return null;
  };

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer center={position} zoom={initialZoom} className="w-full h-full" scrollWheelZoom zoomControl={false}>
        <MapCenterUpdater lat={position.lat} lng={position.lng} />
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url={`https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`}
        />

        <MyMapInitializer setBounds={setBounds} />
        <ChargingStationsMarkers stations={stations} />
        <ConditionalZoomControls />
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default MapView;