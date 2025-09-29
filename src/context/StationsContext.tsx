import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { ChargingStation } from "../types/types";

interface StationsContextType {
  stations: ChargingStation[];
  setStations: Dispatch<SetStateAction<ChargingStation[]>>;
}

const StationsContext = createContext<StationsContextType | undefined>(undefined);

export const StationsProvider = ({ children }: { children: ReactNode }) => {
  const [stations, setStations] = useState<ChargingStation[]>([]);

  return (
    <StationsContext.Provider value={{ stations, setStations }}>
      {children}
    </StationsContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationsContext);
  if (!context) {
    throw new Error("useStations should be used inside StationsProvider");
  }
  return context;
};
