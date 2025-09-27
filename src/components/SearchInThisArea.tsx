import React from 'react';
import { GrSearch } from 'react-icons/gr';

interface SearchInThisAreaProps {
  distance: number;
  onSearch: () => void;
}

const SearchInThisArea: React.FC<SearchInThisAreaProps> = ({ distance, onSearch }) => {
  return (
    <div className={`
          ${distance > 1.5 ? '' : 'animate-fade-out'}
          flex gap-2 justify-center items-center text-base absolute
          top-8 left-1/2 -translate-x-1/2 bg-white border-1 border-gray-300
          rounded-full px-6 py-1 shadow-lg z-500 animate-fade-in cursor-pointer
          `}
      onClick={() => onSearch()}
    >
      <GrSearch className='text-gray-600' />
      <span className='outline-none bg-transparent text-gray-600 font-medium'>{`Search this area`}</span>
    </div>
  );
};

export default SearchInThisArea;
