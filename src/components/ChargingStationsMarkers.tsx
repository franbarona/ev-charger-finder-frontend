import { useStations } from '../context/StationsContext';
import ChargingStationMarker from './ChargingStationMarker';

const ChargingStationsMarkers: React.FC = () => {
  const { stations } = useStations();

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