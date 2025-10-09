import { useState } from "react";
import { INITIAL_COORDS } from "../constants/constants";
import type { Coordinates } from "../types/types";

const useMapPosition = () => {
  const [position, setPosition] = useState<Coordinates>(INITIAL_COORDS);

  return {
    position,
    setPosition,
  };
};

export default useMapPosition;
