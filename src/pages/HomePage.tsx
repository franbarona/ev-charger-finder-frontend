import { useState } from "react";
import ChargerStationList from "../components/ChargerStationList";
import MapView from "../components/MapView";
import type { Coordinates } from "../types/types";
import ButtonHideList from "../components/ButtonHideList";
import { INITIAL_COORDS } from "../constants/constants";
import { useStations } from "../context/StationsContext";
import { MapZoomProvider } from "../context/MapZoomContext";
import { useLoading } from "../context/LoadingContext";
import SearchByBounds from "../components/SearchByBounds";
import { GrClose, GrList } from "react-icons/gr";

const HomePage = () => {
  const { stations } = useStations();
  const [mapCoords, setMapCoords] = useState<Coordinates>(INITIAL_COORDS);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const { isLoading } = useLoading();

  return (
    <MapZoomProvider>
      <div className="relative w-full h-full overflow-hidden">
        {
          isLoading &&
          <div className="absolute z-[1000] w-screen h-screen bg-[rgba(0,0,0,0.3)] backdrop-blur-sm">
            <div className="absolute z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          </div>
        }
        <SearchByBounds centerMapPosition={mapCoords} />
        <MapView setMapCoords={setMapCoords} />
        {/* Normal screen */}
        {
          stations.length > 0 &&
          <div className={`hidden xl:flex
          absolute top-20 z-[900] h-[calc(100%-6rem)] frosted-bg shadow-xl border-r-1 border-gray-300 rounded-r-2xl
          transition-all duration-300 ease-in-out w-[32rem]  ${isSidebarExpanded ? ' ml-0' : '-ml-[32rem]'}`}>
            <ChargerStationList stations={stations} />
            <div className="absolute bottom-1/8 -right-8">
              <ButtonHideList action={toggleSidebar} isSidebarExpanded={isSidebarExpanded} />
            </div>
          </div>
        }
        {/* Mobile - Tablet screen */}
        {
          stations.length > 0 &&
          <div className={`flex xl:hidden
          absolute top-0 z-[900] h-full frosted-bg  shadow-xl 
          transition-all duration-300 ease-in-out w-full ${isSidebarExpanded ? ' mt-0' : 'mt-[100vh]'}`}>
            <ChargerStationList stations={stations} />
            <div className="absolute top-3 right-3 z-[1000] shadow-2xl">
              <button
                type="button"
                onClick={() => { setIsSidebarExpanded(false); console.log(isSidebarExpanded); }}
              >
                  <div className="p-2 frosted-bg rounded-full border-1 border-gray-300 bg-gray-100">
                    <GrClose/>
                </div>
              </button>
            </div>
          </div>
        }
        {
          stations.length > 0 &&
          <div className="absolute bottom-10 right-3 xl:hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setIsSidebarExpanded(true)}
            >
              <div className="text-base p-2 rounded-lg border-1 border-gray-300 text-gray-800 bg-white flex items-center gap-2 font-semibold">
                <GrList className="text-2xl"/>
                {/* Show list */}
              </div>
            </button>
          </div>
        }
      </div>
    </MapZoomProvider>
  )
}

export default HomePage;