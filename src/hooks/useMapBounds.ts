import { useState } from "react";
import type { MapBounds } from "../types/types";

const useMapBounds = () => {
  const [bounds, setBounds] = useState<MapBounds>({
    minLat: 0,
    minLng: 0,
    maxLat: 0,
    maxLng: 0,
  });

  return {
    bounds,
    setBounds,
  };
};

export default useMapBounds;
