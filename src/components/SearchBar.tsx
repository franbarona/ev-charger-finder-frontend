import React, { useEffect, useState } from 'react';
import { useAlert } from '../context/AlertContext';
import { useMapPosition } from '../context/MapPositionContext';
import { LuListFilter, LuSearch, LuX } from 'react-icons/lu';
import { fetchChargingStations, fetchCoordinatesByQuery } from '../services/open-charge-map.service';
import { useStations } from '../context/StationsContext';
import { useLoading } from '../context/LoadingContext';
import { useModal } from '../context/ModalContext';

interface SearchBarProps {
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const { setPosition } = useMapPosition();
  const { addAlert } = useAlert();
  const { setStations } = useStations();
  const { wrapPromise } = useLoading();
  const { isModalOpen, setIsModalOpen } = useModal();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    try {
      const data = await fetchCoordinatesByQuery(query)
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
        handleSearchByCoordinatesFound({ lat: parseFloat(lat), lng: parseFloat(lon) }, query);
      } else {
        addAlert({ type: 'info', message: `No location found` });
      }
    } catch (error) {
      addAlert({ type: 'error', message: `Location searching error: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByCoordinatesFound = async (coords: { lat: number; lng: number }, searchInput?: string) => {
    try {
      const stations = await wrapPromise(fetchChargingStations(coords.lat, coords.lng));
      setStations(stations);
      addAlert({ type: 'success', message: `${stations?.length} charging stations found near ${searchInput}` });
    } catch (error) {
      addAlert({ type: 'error', message: `Error getting charging stations: ${error}` });
    }
  };

  return (
    <form
      onSubmit={handleSearch}
    >
      <div className="flex justify-center items-center gap-3 w-full frosted-bg border-gray-300 border-1 rounded-xl pl-4">
        <button
          type='submit'
          disabled={loading}
          className={`cursor-pointer text-xl text-gray-700 hover:text-emerald-700`}
        >
          <LuSearch />
        </button>
        <input
          type="text"
          placeholder="Search name of city, town or address..."
          className="w-full outline-none bg-transparent text-gray-600 font-medium text-sm xl:text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='flex flex-nowrap relative'>
          {
            query.length > 0 &&
            <button
              type='button'
              disabled={loading}
              onClick={() => setQuery('')}
              className='cursor-pointer text-gray-700 text-sm hover:text-emerald-700 px-2'
            >
              <LuX />
            </button>
          }
        </div>
        <button
          type='button'
          disabled={loading}
          onClick={() => setIsModalOpen(!isModalOpen)}
          className={`
            cursor-pointer text-gray-700 font-medium bg-white p-3 xl:py-1 xl:px-2 
            hover:bg-emerald-700/90 hover:text-white rounded-r-xl
            flex gap-2 justify-center items-center border-l-1 border-gray-300
            `}
        >
          <LuListFilter className='text-xl' />
          <span className='hidden xl:block'>Filters</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
