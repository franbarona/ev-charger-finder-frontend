import { useState } from "react";
import { INITIAL_ZOOM } from "../constants/constants";

const useMapZoom = () => {
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);

  return {
    zoom,
    setZoom,
  };
};

export default useMapZoom;
