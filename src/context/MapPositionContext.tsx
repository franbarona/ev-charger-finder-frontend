import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { Coordinates } from "../types/types";
import { initialCoords } from "../constants/constants";

interface MapPositionContextType {
  position: Coordinates;
  setPosition: Dispatch<SetStateAction<Coordinates>>;
}

const MapPositionContext = createContext<MapPositionContextType | undefined>(undefined);

export const MapPositionProvider = ({ children }: { children: ReactNode }) => {
  const [position, setPosition] = useState<Coordinates>(initialCoords);

  return (
    <MapPositionContext.Provider value={{ position, setPosition }}>
      {children}
    </MapPositionContext.Provider>
  );
};

export const useMapPosition = () => {
  const context = useContext(MapPositionContext);
  if (!context) {
    throw new Error("useMapPosition should be used inside MapPositionProvider");
  }
  return context;
};
