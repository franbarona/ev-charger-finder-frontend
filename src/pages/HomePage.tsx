import { useEffect, useState } from "react";
import ChargerStationList from "../components/ChargerStationList";
import MapView from "../components/MapView";
import type {
  Coordinates,
  LastSearchType,
  StationsSearchFilters,
} from "../types/types";
import ButtonHideList from "../components/ButtonHideList";
import {
  INITIAL_COORDS,
  MAX_LIMIT_STATION_TO_FECH,
  MIN_ZOOM_TO_SEARCH_IN_AREA,
} from "../constants/constants";
import { useStations } from "../context/StationsContext";
import { useStationsSearchFilters } from "../context/StationsSearchFiltersContext";
import { useMapZoom } from "../context/MapZoomContext";
import { useLoading } from "../context/LoadingContext";
import SearchByBounds from "../components/SearchByBounds";
import { LuList } from "react-icons/lu";
import IconActionButton from "../components/ui/IconActionButton";
import { useModal } from "../context/ModalContext";
import StaggeredDropDown from "../components/ui/StaggeredDropDown";
import FilterForm from "../components/FilterForm";
import {
  getDistanceInKm,
  fetchStationsInBounds,
  fetchStationsByCoords,
} from "../services/open-charge-map.service";
import { useMapPosition } from "../context/MapPositionContext";
import { useBounds } from "../context/BoundContext";
import { useAlert } from "../context/AlertContext";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const { stations, setStations } = useStations();
  const { position, setPosition } = useMapPosition();
  const { bounds } = useBounds();
  const { stationsSearchFilters, setStationsSearchFilters } =
    useStationsSearchFilters();
  const [isListExpanded, setIsListExpanded] = useState(true);
  const { isModalOpen, setIsModalOpen } = useModal();
  const { isLoading } = useLoading();
  const { wrapPromise } = useLoading();
  const { zoom } = useMapZoom();
  const { addAlert } = useAlert();
  const [mapCoords, setMapCoords] = useState<Coordinates>(INITIAL_COORDS);
  const [lastSearchType, setLastSeachType] = useState<LastSearchType>();
  const [isSearchInBoundsDisabled, setIsSearchInBoundsDisabled] =
    useState<boolean>(false);

  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  useEffect(() => {
    const distance = getDistanceInKm(
      position.lat,
      position.lng,
      mapCoords.lat,
      mapCoords.lng
    );
    if (
      zoom > MIN_ZOOM_TO_SEARCH_IN_AREA &&
      (!stations.length || distance > 1.5)
    ) {
      setIsSearchInBoundsDisabled(false);
    } else {
      setIsSearchInBoundsDisabled(true);
    }
  }, [zoom, mapCoords, stations, position]);

  // SEARCH BY COORDS
  const handleSearchByCoords = async (
    coords: Coordinates,
    searchInput?: string
  ) => {
    setLastSeachType("coords");
    try {
      const newStations = await wrapPromise(
        fetchStationsByCoords(coords, stationsSearchFilters)
      );
      setStations(newStations);
      addAlert({
        type: "success",
        message: `${stations?.length} charging stations found near ${searchInput}`,
      });
    } catch (error) {
      addAlert({
        type: "error",
        message: `Error getting charging stations: ${error}`,
      });
    }
  };

  // SEARCH IN BOUNDS
  const handleSearchInBounds = async () => {
    setLastSeachType("bounds");
    try {
      const newStations = await wrapPromise(
        fetchStationsInBounds(bounds, stationsSearchFilters)
      );
      setStations(newStations);
      setPosition(mapCoords); //¿ESTO HACE FALTA?

      if (newStations.length >= MAX_LIMIT_STATION_TO_FECH) {
        addAlert({
          type: "info",
          message: `Maximum limit of ${newStations?.length} stations exceeded`,
        });
      }
      addAlert({
        type: "success",
        message: `${newStations?.length} charging stations found in the area`,
      });
    } catch (error) {
      addAlert({
        type: "error",
        message: `Error getting charging stations: ${error}`,
      });
    }
  };

  // UPDATE FILTERS
  const handleOnChangeFilters = (
    newStationsSearchFilters: StationsSearchFilters
  ) => {
    setStationsSearchFilters(newStationsSearchFilters);
    console.log("stationsSearchFilters", newStationsSearchFilters);
    setIsModalOpen(false);
    if (lastSearchType === 'coords') handleSearchByCoords(position);
    else if (lastSearchType === 'bounds') handleSearchInBounds();
  };

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute bottom-5 right-5 z-10">
          <span>Lat: {position.lat} </span>
          <span>Long: {position.lng} </span>
        </div>
        {isLoading && (
          <div className="absolute z-[1000] w-screen h-screen bg-[rgba(0,0,0,0.3)] backdrop-blur-sm">
            <div className="absolute z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          </div>
        )}
        {/* <div className="flex-1 xl:max-w-xl xl:mx-10"> */}
        <div className="absolute top-3 w-[80vw] max-w-2xl z-50 left-1/2 -translate-x-1/2">
          <SearchBar handleSearchByCoords={handleSearchByCoords} />
        </div>
        {/* </div> */}
        <SearchByBounds
          isDisabled={isSearchInBoundsDisabled}
          handleSearchByBounds={handleSearchInBounds}
        />
        <MapView setMapCoords={setMapCoords} />
        {/* Normal screen */}
        {stations.length > 0 && (
          <div
            className={`hidden xl:block
              absolute top-20 z-[900] h-[calc(100%-6rem)] frosted-bg shadow-xl border-r-1 border-gray-300 rounded-r-2xl
              transition-all duration-300 ease-in-out w-[32rem]  ${
                isListExpanded ? " ml-0" : "-ml-[32rem]"
              }`}
          >
            <ChargerStationList stations={stations} />
            <div className="absolute bottom-1/8 -right-8">
              <ButtonHideList
                action={toggleList}
                isSidebarExpanded={isListExpanded}
              />
            </div>
          </div>
        )}
        {/* Mobile - Tablet screen */}
        {stations.length > 0 && (
          <div
            className={`block xl:hidden
            absolute top-0 z-[900] h-full frosted-bg  shadow-xl w-full
            transition-all duration-300 ease-in-out ${
              isListExpanded ? " mt-0" : "mt-[100vh]"
            }`}
          >
            <ChargerStationList stations={stations} closeList={toggleList} />
          </div>
        )}

        {/* Show list button on mobile */}
        {stations.length > 0 && (
          <div className="absolute bottom-10 right-3 xl:hidden shadow-2xl">
            <IconActionButton icon={LuList} action={toggleList} />
          </div>
        )}
      </div>

      <StaggeredDropDown isVisible={isModalOpen}>
        <FilterForm
          onChangeFilters={handleOnChangeFilters}
          settedData={stationsSearchFilters}
        />
      </StaggeredDropDown>
    </>
  );
};

export default HomePage;
