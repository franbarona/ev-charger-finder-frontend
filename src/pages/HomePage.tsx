import { useState } from "react";
import ChargerStationList from "../components/ChargerStationList";
import MapView from "../components/MapView";
import type { Coordinates } from "../types/types";
import { getDistanceInKm } from "../services/open-charge-map.service";
import ButtonHideList from "../components/ButtonHideList";
import SearchInThisArea from "../components/SearchInThisArea";
import { useMapPosition } from "../context/MapPositionContext";
import { initialCoords } from "../constants/constants";
import { useStations } from "../context/StationsContext";
import { useBounds } from "../context/BoundContext";

const HomePage = () => {
  const { bounds } = useBounds();
  const { stations } = useStations();
  const { position } = useMapPosition();
  const [mapCoords, setMapCoords] = useState<Coordinates>(initialCoords);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const distance = getDistanceInKm(position.lat, position.lng, mapCoords.lat, mapCoords.lng);

  return (
    <div className="relative w-full h-full">
      <SearchInThisArea centerPosition={mapCoords} distance={distance} />
      <MapView setMapCoords={setMapCoords} />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-500">
        <span>
          {getDistanceInKm(bounds.minLat, bounds.minLng, bounds.maxLat, bounds.maxLng).toFixed(2)} km 
        </span>
      </div>
      {
        <div className={`
          absolute top-20 z-[900] h-[calc(100%-6rem)] frosted-bg flex flex-col shadow-xl border-r-1 border-gray-300 rounded-r-2xl
        transition-all duration-300 ease-in-out w-lg ${isSidebarExpanded && stations.length > 0 ? ' ml-0' : ' -ml-[32rem]'}`}>
          <ChargerStationList stations={stations} />
          {
            stations.length > 0 &&
            <ButtonHideList action={toggleSidebar} isSidebarExpanded={isSidebarExpanded} />
          }
        </div>
      }
    </div>
  )
}

export default HomePage;