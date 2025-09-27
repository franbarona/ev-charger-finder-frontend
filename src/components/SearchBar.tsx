import React, { useState } from 'react';
import { useAlert } from '../context/AlertContext';
import { GrClose, GrSearch } from 'react-icons/gr';
import type { Coordinates } from '../types/types';

interface SearchBarProps {
  onCoordinatesFound: (coords: Coordinates, searchInput?: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCoordinatesFound }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { addAlert } = useAlert();
  setLoading(true);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        onCoordinatesFound({ lat: parseFloat(lat), lng: parseFloat(lon) }, query);
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
      <div className="flex justify-center items-center gap-3 rounded-full shadow-lg overflow-hidden w-full bg-white border-1 border-gray-300">
        <input
          type="text"
          placeholder="Search location..."
          className="w-full outline-none bg-transparent text-gray-600 text-base font-medium ml-6"
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
              className='cursor-pointer text-gray-700 text-sm hover:text-emerald-700 px-4 py-3'
            >
              <GrClose />
            </button>
          }
          <div className='w-[1px] h-[30px] m-auto mx-0 bg-gray-300' />
          <button
            type='submit'
            disabled={loading}
            className={`cursor-pointer px-6 py-3 text-xl text-gray-700 hover:text-emerald-700`}
          >
            <GrSearch />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
