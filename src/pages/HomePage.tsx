import { useEffect, useState } from "react";
import { LuInfo, LuList } from "react-icons/lu";
import {
  INITIAL_COORDS,
  MAX_LIMIT_STATION_TO_FECH,
  MIN_ZOOM_TO_SEARCH_IN_AREA,
} from "../constants/constants";
import ChargerStationList from "../components/ChargerStationList";
import MapView from "../components/MapView";
import ButtonHideList from "../components/ButtonHideList";
import SearchByBounds from "../components/SearchByBounds";
import FilterForm from "../components/FilterForm";
import SearchBar from "../components/SearchBar";
import Modal from "../components/ui/Modal";
import AboutSection from "../components/sections/AboutSection";
import { useModal } from "../context/ModalContext";
import { useLoading } from "../context/LoadingContext";
import { useAlert } from "../context/AlertContext";
import { useAboutSection } from "../context/AboutSectionContext";
import useStations from "../hooks/useStations";
import useMapFilters from "../hooks/useMapFilters";
import useMapZoom from "../hooks/useMapZoom";
import useMapPosition from "../hooks/useMapPosition";
import useMapBounds from "../hooks/useMapBounds";
import {
  getDistanceInKm,
  fetchStationsInBounds,
  fetchStationsByCoords,
} from "../services/open-charge-map.service";
import type {
  Coordinates,
  LastSearchType,
  StationsSearchFilters,
} from "../types/types";
import MobileActions from "../components/MobileActions";

const HomePage = () => {
  const { stations, setStations } = useStations();
  const { position, setPosition } = useMapPosition();
  const {
    isAboutSectionOpen,
    openAboutSection,
    closeAboutSection,
    handleOverlayClickAboutSection,
  } = useAboutSection();
  const { bounds, setBounds } = useMapBounds();
  const { filters, setFilters, numFiltersApplied } = useMapFilters();
  const [isListExpanded, setIsListExpanded] = useState(true);
  const { isModalOpen, closeModal, handleOverlayClick } = useModal();
  const { isLoading } = useLoading();
  const { wrapPromise } = useLoading();
  const { zoom, setZoom } = useMapZoom();
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
        fetchStationsByCoords(coords, filters)
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
        fetchStationsInBounds(bounds, filters)
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
  const handleOnChangeFilters = (newFilters: StationsSearchFilters) => {
    setFilters(newFilters);
    closeModal();
  };

  useEffect(() => {
    if (lastSearchType === "coords") handleSearchByCoords(position);
    else if (lastSearchType === "bounds") handleSearchInBounds();
  }, [filters]);

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        {isLoading && (
          <div className="absolute z-100 w-screen h-screen bg-[rgba(0,0,0,0.3)] backdrop-blur-sm">
            <div className="absolute z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          </div>
        )}
        <div className="absolute top-3.5 w-[80vw] max-w-lg z-40 left-1/2 -translate-x-1/2">
          <SearchBar
            handleSearchByCoords={handleSearchByCoords}
            setPosition={setPosition}
            numFiltersApplied={numFiltersApplied}
          />
        </div>
        <SearchByBounds
          isDisabled={isSearchInBoundsDisabled}
          handleSearchByBounds={handleSearchInBounds}
        />
        <MapView
          stations={stations}
          position={position}
          setMapCoords={setMapCoords}
          setZoom={setZoom}
          setBounds={setBounds}
        />
        {/* Normal screen */}
        {stations.length > 0 && (
          <div
            className={`hidden lg:block
              absolute top-20 z-40 h-[calc(100%-6rem)] frosted-bg shadow-xl border-r-1 border-gray-300 rounded-r-2xl
              transition-all duration-300 ease-in-out w-[32rem]  ${
                isListExpanded ? " ml-0" : "-ml-[32rem]"
              }`}
          >
            <div className="absolute bottom-1/8 -right-9">
              <ButtonHideList
                action={toggleList}
                isSidebarExpanded={isListExpanded}
              />
            </div>
            <ChargerStationList stations={stations} closeList={toggleList} />
          </div>
        )}
        {/* Mobile - Tablet screen */}
        {stations.length > 0 && (
          <div
            className={`block lg:hidden
            absolute top-0 z-40 h-full frosted-bg  shadow-xl w-full
            transition-all duration-300 ease-in-out ${
              isListExpanded ? " mt-0" : "mt-[100vh]"
            }`}
          >
            <ChargerStationList stations={stations} closeList={toggleList} />
          </div>
        )}
        <MobileActions
          stations={stations}
          openAboutSection={openAboutSection}
          toggleList={toggleList}
        />
      </div>

      <Modal
        isVisible={isModalOpen}
        handleClose={closeModal}
        handleOverlayClick={handleOverlayClick}
        title="Search Filter:"
      >
        <FilterForm
          onChangeFilters={handleOnChangeFilters}
          settedData={filters}
        />
      </Modal>
      <Modal
        isVisible={isAboutSectionOpen}
        handleClose={closeAboutSection}
        handleOverlayClick={handleOverlayClickAboutSection}
      >
        <AboutSection />
      </Modal>
    </>
  );
};

export default HomePage;
