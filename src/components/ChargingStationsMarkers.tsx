import { useEffect } from 'react';
import { useStations } from '../context/StationsContext';
import ChargingStationMarker from './ChargingStationMarker';


const ChargingStationsMarkers: React.FC = () => {
  const { stations } = useStations();

  useEffect(() => {
    console.log("stations se actualizó:", stations);
    // aquí puedes ejecutar lógica adicional
  }, [stations]); // 👈 se dispara cada vez que cambia el array
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