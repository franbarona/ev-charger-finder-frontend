import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MapBounds } from '../types/types';

interface BoundContextType {
  bounds: MapBounds;
  setBounds: (bounds: MapBounds) => void;
}

const BoundContext = createContext<BoundContextType | undefined>(undefined);

interface BoundProviderProps {
  children: ReactNode;
}

export const BoundProvider: React.FC<BoundProviderProps> = ({ children }) => {
  const [bounds, setBounds] = useState<MapBounds>({ minLat: 0, minLng: 0, maxLat: 0, maxLng: 0 });

  return (
    <BoundContext.Provider value={{ bounds, setBounds }}>
      {children}
    </BoundContext.Provider>
  );
};

export const useBounds = (): BoundContextType => {
  const context = useContext(BoundContext);
  if (!context) {
    throw new Error('useBounds must be used within a BoundProvider');
  }
  return context;
};
