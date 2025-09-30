import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerAvailable from '/marker-available.svg';
import markerPartiallyAvailable from '/marker-partially-avaliable.svg';
import markerNotAvailable from '/marker-not-avaliable.svg';
import { EnumStationStatus, type ChargingStation } from '../types/types';
import { GrClose } from 'react-icons/gr';
import HorizontalScroll from './HorizontalScroll';
import ConnectionChargerCard from './ConnectionChargerCard';
import { getOperatorData, getStationStatus } from '../services/open-charge-map.service';

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
      <Popup closeButton={false} className='custom-popup' autoPan={true} autoPanPadding={[10, 100]}>
        <button onClick={handleClose} className='absolute top-0 right-0 m-3 cursor-pointer text-sm text-gray-600 hover:text-gray-800'>
          <GrClose />
        </button>
        <div className="text-sm pb-4 space-y-1 w-full">
          <h1 className="font-semibold">{station.AddressInfo.Title}</h1>
          <div className='text-sm text-gray-600'>
            {
              station.AddressInfo.AddressLine1 && <span>{station.AddressInfo.AddressLine1}</span>
            }
            {
              station.AddressInfo.Town && <span>{`, ${station.AddressInfo.Town}`}</span>
            }
            {
              station.AddressInfo.StateOrProvince && <span>{`, ${station.AddressInfo.StateOrProvince}`}</span>
            }
            {
              station.AddressInfo.Postcode && <span>{` (${station.AddressInfo.Postcode})`}</span>
            }
          </div>
          {
            station.OperatorID !== 1 &&
            <div className='text-xs text-gray-600'>
              <a
                href={getOperatorData(station.OperatorID)?.WebsiteURL || undefined}
                target='_blank'
                className='text-emerald-800 text-sm hover:underline text-end'>
                {getOperatorData(station.OperatorID)?.Title}
              </a>
            </div>
          }
          <HorizontalScroll>
            <div className='scrollbar-hide flex gap-2 aspect-square max-h-[150px] w-[95%] mt-2'>
              {
                station.Connections.map((connection) => (
                  <ConnectionChargerCard key={connection.ID} connection={connection} />
                ))
              }
            </div>
          </HorizontalScroll>
        </div>
      </Popup>
    </Marker>
  );
};

export default ChargingStationMarker;