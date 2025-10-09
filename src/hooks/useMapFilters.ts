import { useEffect, useState } from "react";
import type { StationsSearchFilters } from "../types/types";
import { MAX_KW_RANGE, MIN_KW_RANGE } from "../constants/constants";

const getFiltersLength = (filters: StationsSearchFilters): number => {
  let filtersLength = 0;
  if (filters.usage.length > 0) {
    filtersLength += 1;
  }
  if (
    filters.kwRange.min > MIN_KW_RANGE ||
    filters.kwRange.max < MAX_KW_RANGE
  ) {
    filtersLength += 1;
  }
  if (filters.connections.length > 0) {
    filtersLength += 1;
  }
  return filtersLength;
};

const useMapFilters = () => {
  const [filters, setFilters] = useState<StationsSearchFilters>({
    usage: ["1", "4", "7", "5"],
    kwRange: {
      min: 10,
      max: 250,
    },
    connections: [],
  });

  const [numFiltersApplied, setNumFiltersApplied] = useState<number>(0);

  useEffect(() => {
    setNumFiltersApplied(getFiltersLength(filters));
  }, [filters]);

  return {
    filters,
    setFilters,
    numFiltersApplied
  };
};

export default useMapFilters;
