import { PiMapPinArea } from 'react-icons/pi';

interface SearchByBoundsProps {
  isDisabled: boolean;
  handleSearchByBounds: () => void;
}

const SearchByBounds: React.FC<SearchByBoundsProps> = ({ isDisabled = false, handleSearchByBounds }) => {
  return (
    <div className={`
          ${!isDisabled ? 'animate-fade-in' : 'animate-fade-out'}
          flex gap-2 justify-center items-center text-base absolute top-15
          xl:top-20 left-1/2 -translate-x-1/2 bg-white border-1 border-gray-300
          rounded-full px-6 py-1 shadow-lg z-1 cursor-pointer text-gray-600
          `}
      onClick={handleSearchByBounds}
    >
      <PiMapPinArea className='text-xl' />
      <span className='outline-none bg-transparent font-medium text-sm xl:text-base'>{`Explore this area`}</span>
    </div>
  );
};

export default SearchByBounds;
