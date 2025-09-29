import React from 'react';
import { PiMapPinArea } from 'react-icons/pi';
import { useStations } from '../context/StationsContext';
import { useAlert } from '../context/AlertContext';
import { searchWithCoordinates } from '../services/open-charge-map.service';
import { useBounds } from '../context/BoundContext';

interface SearchInThisAreaProps {
  centerPosition: { lat: number; lng: number };
  distance: number;
}

const SearchInThisArea: React.FC<SearchInThisAreaProps> = ({ centerPosition, distance }) => {
  const { bounds } = useBounds();
  const { setStations } = useStations();
  const { addAlert } = useAlert();

  const handleSearchInMapBounds = async () => {
    try {
      const newStations = await searchWithCoordinates(centerPosition.lat, centerPosition.lng, bounds);
      setStations(newStations);
      // setPosition({ lat: position.lat+0.00000001, lng: position.lng }); // Actualiza la posición para reflejar el centro actual del mapa
      addAlert({ type: 'success', message: `${newStations?.length} charging stations found in the area` });
    } catch (error) {
      addAlert({ type: 'error', message: `Error getting charging stations: ${error}` });
    }
  };
  return (
    <div className={`
          ${distance > 1.5 ? '' : 'animate-fade-out'}
          flex gap-2 justify-center items-center text-base absolute
          top-20 left-1/2 -translate-x-1/2 bg-white border-1 border-gray-300
          rounded-full px-6 py-1 shadow-lg z-500 animate-fade-in cursor-pointer
          `}
      onClick={() => handleSearchInMapBounds()}
    >
      <PiMapPinArea className='text-gray-600' />
      <span className='outline-none bg-transparent text-gray-600 font-medium'>{`Explore this area`}</span>
    </div>
  );
};

export default SearchInThisArea;
