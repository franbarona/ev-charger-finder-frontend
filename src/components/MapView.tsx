import { MapContainer, TileLayer, ZoomControl, useMapEvents } from 'react-leaflet';
import ChargingStationsMarkers from './ChargingStationsMarkers';
import MapCenterUpdater from './MapCenterUpdater';
import MapCenterTracker from './MapCenterTracker';
import { useBounds } from '../context/BoundContext';
import { useMapPosition } from '../context/MapPositionContext';
import { useEffect } from 'react';
import CustomMarker from './CustomMarker';
import ZoomListener from './ZoomListener';

interface MapViewProps {
  initialZoom?: number;
  setMapCoords: (coords: { lat: number; lng: number }) => void;
}

const MapView: React.FC<MapViewProps> = ({ initialZoom = 13, setMapCoords }) => {
  const { position } = useMapPosition();
  const { bounds, setBounds } = useBounds();

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        const bounds = map.getBounds();
        console.log('Map bounds changed:', bounds);
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

        <ChargingStationsMarkers />
        <ZoomControl position="topright" />
        <MapEvents />
        <ZoomListener onZoomChange={(zoom) => console.log('Zoom changed:', zoom)} />
        <CustomMarker position={{ lat: bounds.maxLat, lng: bounds.minLng }} />
        <CustomMarker position={{ lat: bounds.maxLat, lng: bounds.maxLng }} />
        <CustomMarker position={{ lat: bounds.minLat, lng: bounds.minLng }} />
        <CustomMarker position={{ lat: bounds.minLat, lng: bounds.maxLng }} />
        <MapCenterTracker initialCoords={position} onCenterChange={(lat, lng) => {
          setMapCoords({ lat, lng });
        }} />
      </MapContainer>
    </div>
  );
};

export default MapView;