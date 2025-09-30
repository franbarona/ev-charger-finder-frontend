import { MapContainer, TileLayer, ZoomControl, useMapEvents } from 'react-leaflet';
import ChargingStationsMarkers from './ChargingStationsMarkers';
import MapCenterUpdater from './MapCenterUpdater';
import { useBounds } from '../context/BoundContext';
import { useMapPosition } from '../context/MapPositionContext';
import MyMapInitializer from './MapInitializer';
import { useMapZoom } from '../context/MapZoomContext';
import { ConditionalZoomControls } from './ConditionalZoomControls';

interface MapViewProps {
  initialZoom?: number;
  setMapCoords: (coords: { lat: number; lng: number }) => void;
}

const MapView: React.FC<MapViewProps> = ({ initialZoom = 13, setMapCoords }) => {
  const { position } = useMapPosition();
  const { setBounds } = useBounds();
  const { setZoom } = useMapZoom();

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

        <MyMapInitializer />
        <ChargingStationsMarkers />
        {/* <ZoomControl position="topright" /> */}
        <ConditionalZoomControls />
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default MapView;