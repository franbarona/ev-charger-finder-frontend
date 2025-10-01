import React, { useEffect, useRef, useState } from 'react';
import IconActionButton from './ui/IconActionButton';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface HorizontalScrollProps {
  children: React.ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const { clientWidth } = scrollRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;

    if (!el) return;

    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll); // por si cambia el tamaño de pantalla

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Button left */}
      {
        canScrollLeft &&
        <div className='absolute -left-5 top-1/2 -translate-y-1/2 z-10'>
          <IconActionButton icon={LuChevronLeft} action={() => scroll('left')} iconSize='text-xl' bgClass='bg-gray-300/50' />
        </div>
      }

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4"
      >
        {children}
      </div>

      {/* Button right */}
      {
        canScrollRight &&
        <div className='absolute -right-5 top-1/2 -translate-y-1/2 z-10'>
          <IconActionButton icon={LuChevronRight} action={() => scroll('right')} iconSize='text-xl' bgClass='bg-gray-300/50' />
        </div>
      }
    </div>
  );
};

export default HorizontalScroll;
