import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
} from "react";
import type { StationsSearchFilters } from "../types/types";

interface StationsSearchFiltersContextType {
  stationsSearchFilters: StationsSearchFilters;
  setStationsSearchFilters: Dispatch<SetStateAction<StationsSearchFilters>>;
  filtersLength: number;
}

const StationsSearchFiltersContext = createContext<StationsSearchFiltersContextType | undefined>(undefined);

export const StationsSearchFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [stationsSearchFilters, setStationsSearchFilters] = useState<StationsSearchFilters>(
    {
      usage: []
    }
  );

  const [filtersLength, setFiltersLength] = useState<number>(0);

  useEffect(() => {
    setFiltersLength(getFiltersLength(stationsSearchFilters));
  }, [stationsSearchFilters])

  return (
    <StationsSearchFiltersContext.Provider value={{ stationsSearchFilters, setStationsSearchFilters, filtersLength }}>
      {children}
    </StationsSearchFiltersContext.Provider>
  );
};

export const useStationsSearchFilters = () => {
  const context = useContext(StationsSearchFiltersContext);
  if (!context) {
    throw new Error("useStationsSearchFilters should be used inside StationsSearchFiltersProvider");
  }
  return context;
};

const getFiltersLength = (filters: StationsSearchFilters): number => {
  let filtersLength = 0; 
  if (filters.usage.length > 0) {
    filtersLength += 1;
  }
  return filtersLength;
}