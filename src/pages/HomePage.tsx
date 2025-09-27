import { useState } from "react";
import ChargerStationList from "../components/ChargerStationList";
import MapView from "../components/MapView";
import type { ChargingStation, Coordinates } from "../types/types";
import { useAlert } from "../context/AlertContext";
import SearchBar from "../components/SearchBar";
import { fetchChargingStations, getDistanceInKm, searchWithCoordinates } from "../services/open-charge-map.service";
import ButtonHideList from "../components/ButtonHideList";
import SearchInThisArea from "../components/SearchInThisArea";

const initialCoords: Coordinates = {
  lat: 39.466667, // Valencia
  lng: -0.375000,
};

const HomePage = () => {
  const { addAlert } = useAlert();
  const [position, setPosition] = useState<Coordinates>(initialCoords);
  const [mapCoords, setMapCoords] = useState<Coordinates>(initialCoords);
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  console.log('mapCoords', mapCoords)

  const distance = getDistanceInKm(position.lat, position.lng, mapCoords.lat, mapCoords.lng);

  const handleCoordinatesFound = async (coords: { lat: number; lng: number }, searchInput?: string) => {
    setPosition(coords);

    try {
      const stations = await fetchChargingStations(coords.lat, coords.lng);
      setChargingStations(stations);
      addAlert({ type: 'success', message: `${stations?.length} charging stations found near ${searchInput}` });
    } catch (error) {
      addAlert({ type: 'error', message: `Error getting charging stations: ${error}` });
    }
  };

  const handleSearchInTheCenterOfTheMap = async () => {
    setPosition(mapCoords);
    try {
      const stations = await searchWithCoordinates(mapCoords.lat, mapCoords.lng);
      setChargingStations(stations);
      addAlert({ type: 'success', message: `${stations?.length} charging stations found in the area` });
    } catch (error) {
      addAlert({ type: 'error', message: `Error getting charging stations: ${error}` });
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-8 z-[1000] w-md">
        <SearchBar onCoordinatesFound={handleCoordinatesFound} />
      </div>
      <SearchInThisArea distance={distance} onSearch={handleSearchInTheCenterOfTheMap} />
      <MapView position={position} zoom={13} chargingStations={chargingStations} setMapCoords={setMapCoords} />
      {
        <div className={`absolute top-0 z-[900] h-full bg-gray-50 flex flex-col shadow-xl border-r-1 border-gray-300
        transition-all duration-300 ease-in-out w-lg ${isSidebarExpanded && chargingStations.length > 0 ? ' ml-0' : ' -ml-[32rem]'}`}>
          <ChargerStationList stations={chargingStations} />
          {
            chargingStations.length > 0 &&
            <ButtonHideList action={toggleSidebar} isSidebarExpanded={isSidebarExpanded} />
          }
        </div>
      }
    </div>
  )
}

export default HomePage;