import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerAvailable from '/marker-available.svg';
import markerPartiallyAvailable from '/marker-partially-avaliable.svg';
import markerNotAvailable from '/marker-not-avaliable.svg';
import { EnumStationStatus, type ChargingStation } from '../types/types';
import { getStationStatus } from '../services/open-charge-map.service';
import StationPopupContent from './StationPopupContent';

interface ChargingStationMarkerProps {
  station: ChargingStation;
}

const markerAvailableIcon = new L.Icon({
  iconUrl: markerAvailable,
  iconSize: [40, 40],        // tamaño del icono
  iconAnchor: [16, 32],      // punto del icono que se ancla al mapa
  popupAnchor: [0, -32],     // punto donde aparece el popup respecto al icono
  className: 'custom-leaflet-icon', // clase CSS opcional
});

const markerPartiallyAvailableIcon = new L.Icon({
  iconUrl: markerPartiallyAvailable,
  iconSize: [40, 40],        // tamaño del icono
  iconAnchor: [16, 32],      // punto del icono que se ancla al mapa
  popupAnchor: [0, -32],     // punto donde aparece el popup respecto al icono
  className: 'custom-leaflet-icon', // clase CSS opcional
});

const markerNotAvailableIcon = new L.Icon({
  iconUrl: markerNotAvailable,
  iconSize: [40, 40],        // tamaño del icono
  iconAnchor: [16, 32],      // punto del icono que se ancla al mapa
  popupAnchor: [0, -32],     // punto donde aparece el popup respecto al icono
  className: 'custom-leaflet-icon', // clase CSS opcional
});

const ChargingStationMarker: React.FC<ChargingStationMarkerProps> = ({ station }) => {
  const map = useMap();
  const handleClose = () => {
    map.closePopup();
  };

  const statusStatus: EnumStationStatus = getStationStatus(station);

  return (
    <Marker
      position={{ lat: station.AddressInfo.Latitude, lng: station.AddressInfo.Longitude }}
      icon={
        statusStatus === EnumStationStatus.Available
          ? markerAvailableIcon
          : statusStatus === EnumStationStatus.PartiallyAvailable
            ? markerPartiallyAvailableIcon
            : markerNotAvailableIcon
      }
    >
      <Popup closeButton={false} className='custom-popup w-full' autoPan={true} autoPanPadding={[10, 100]}>
        <StationPopupContent station={station} closeAction={handleClose} />
      </Popup>
    </Marker>
  );
};

export default ChargingStationMarker;