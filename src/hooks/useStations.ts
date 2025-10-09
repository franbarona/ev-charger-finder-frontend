import { useState } from "react";
import type { ChargingStation } from "../types/types";

const useStations = () => {
  const [stations, setStations] = useState<ChargingStation[]>([]);

  return {
    stations,
    setStations,
  };
};

export default useStations;
