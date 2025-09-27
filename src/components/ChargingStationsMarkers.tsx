import type { ChargingStation } from '../types/types';
import ChargingStationMarker from './ChargingStationMarker';

interface ChargingStationsMarkersProps {
  stations: ChargingStation[];
}

const ChargingStationsMarkers: React.FC<ChargingStationsMarkersProps> = ({ stations }) => {
  return (
    <>
      {stations.map((station) => {
        return (
          <ChargingStationMarker
            key={station.ID}
            station={station}
          />
        );
      })}
    </>
  );
};

export default ChargingStationsMarkers;