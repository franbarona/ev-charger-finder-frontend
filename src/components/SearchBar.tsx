import React, { useEffect, useState } from 'react';
import { useAlert } from '../context/AlertContext';
import { useMapPosition } from '../context/MapPositionContext';
import { LuListFilter, LuSearch, LuX } from 'react-icons/lu';
import { fetchCoordinatesByQuery } from '../services/open-charge-map.service';
import { useModal } from '../context/ModalContext';
import type { Coordinates } from '../types/types';
import { useStationsSearchFilters } from '../context/StationsSearchFiltersContext';

interface SearchBarProps {
  handleSearchByCoords: (coords: Coordinates) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchByCoords, initialQuery = '' }) => {
  const { filtersLength } = useStationsSearchFilters();
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const { setPosition } = useMapPosition();
  const { addAlert } = useAlert();
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
        const newCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(newCoords);
        handleSearchByCoords(newCoords)
      } else {
        addAlert({ type: 'info', message: `No location found` });
      }
    } catch (error) {
      addAlert({ type: 'error', message: `Location searching error: ${error}` });
    } finally {
      setLoading(false);
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
            hover:bg-zinc-800 hover:text-white rounded-r-xl
            flex gap-2 justify-center items-center border-l-1 border-gray-300
            `}
        >
          <LuListFilter className='text-xl' />
          <span className='hidden xl:block'>Filters</span>
        </button>
        {
          filtersLength > 0 &&
          <div className='absolute -right-2 -top-2 z-50 w-5 h-5 px-1 pb-1 pt-0.5 bg-green-700 rounded-full flex'>
            <span className='m-auto text-white text-xs font-semibold'>
              {filtersLength}
            </span>
          </div>
        }
      </div>
    </form>
  );
};

export default SearchBar;
