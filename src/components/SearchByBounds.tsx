import React, { useEffect, useState } from 'react';
import { PiMapPinArea } from 'react-icons/pi';
import { useStations } from '../context/StationsContext';
import { useAlert } from '../context/AlertContext';
import { getDistanceInKm, searchStationsInBounds } from '../services/open-charge-map.service';
import { useBounds } from '../context/BoundContext';
import { useMapPosition } from '../context/MapPositionContext';
import { useMapZoom } from '../context/MapZoomContext';
import { MAX_LIMIT_STATION_TO_FECH, MIN_ZOOM_TO_SEARCH_IN_AREA } from '../constants/constants';
import { useLoading } from '../context/LoadingContext';

interface SearchByBoundsProps {
  centerMapPosition: { lat: number; lng: number };
}

const SearchByBounds: React.FC<SearchByBoundsProps> = ({ centerMapPosition }) => {
  const { position } = useMapPosition();
  const [distance, setDistance] = useState(0);
  const { stations } = useStations();
  const { bounds } = useBounds();
  const { setPosition } = useMapPosition();
  const { setStations } = useStations();
  const { addAlert } = useAlert();
  const { zoom } = useMapZoom();
  const { wrapPromise } = useLoading();

  useEffect(() => {
    setDistance(getDistanceInKm(position.lat, position.lng, centerMapPosition.lat, centerMapPosition.lng));
  }, [centerMapPosition]);

  const handleSearchInMapBounds = async () => {
    try {
      const newStations =  await wrapPromise(searchStationsInBounds(bounds));
      setStations(newStations);
      setPosition(centerMapPosition);
      if (newStations.length >= MAX_LIMIT_STATION_TO_FECH) {
        addAlert({ type: 'info', message: `Maximum limit of ${newStations?.length} stations exceeded` });
      }
      addAlert({ type: 'success', message: `${newStations?.length} charging stations found in the area` });
    } catch (error) {
      addAlert({ type: 'error', message: `Error getting charging stations: ${error}` });
    }
  };
  return (
    <div className={`
          ${(zoom > MIN_ZOOM_TO_SEARCH_IN_AREA && (!stations.length || distance > 1.5 /*|| zoomChanged*/)) ? 'animate-fade-in' : 'animate-fade-out'}
          flex gap-2 justify-center items-center text-base absolute top-15
          xl:top-20 left-1/2 -translate-x-1/2 bg-white border-1 border-gray-300
          rounded-full px-6 py-1 shadow-lg z-1 cursor-pointer text-gray-600
          `}
      onClick={() => {
        handleSearchInMapBounds();
      }}
    >
      <PiMapPinArea className='text-xl' />
      <span className='outline-none bg-transparent font-medium text-sm xl:text-base'>{`Explore this area`}</span>
    </div>
  );
};

export default SearchByBounds;
