import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import { INITIAL_ZOOM } from "../constants/constants";

interface MapZoomContextType {
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
}

const MapZoomContext = createContext<MapZoomContextType | undefined>(undefined);

export const MapZoomProvider = ({ children }: { children: ReactNode }) => {
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);

  return (
    <MapZoomContext.Provider value={{ zoom, setZoom }}>
      {children}
    </MapZoomContext.Provider>
  );
};

export const useMapZoom = () => {
  const context = useContext(MapZoomContext);
  if (!context) {
    throw new Error("useMapZoom should be used inside MapZoomProvider");
  }
  return context;
};
