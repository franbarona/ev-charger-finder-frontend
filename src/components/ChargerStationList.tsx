import React, { useState, useEffect, useRef } from "react";
import {
  getOperatorData,
  getStationStatus,
  getStatusTypeData,
} from "../services/open-charge-map.service";
import { LuMapPin } from "react-icons/lu";
import type { ChargingStation } from "../types/types";
import { getStationStatusColor } from "../services/utils.service";
import ConnectionChargerCard from "./ConnectionChargerCard";
import { LuX } from "react-icons/lu";
import IconActionButton from "./ui/IconActionButton";

interface ChargerStationListProps {
  stations: ChargingStation[];
  closeList: () => void;
}

const ChargerStationList: React.FC<ChargerStationListProps> = ({
  stations,
  closeList,
}) => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      // Prevent pinch-to-zoom
      if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const preventWheel = (e: WheelEvent) => {
      // Prevent zoom ctrl + scroll in desktop
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', preventZoom, { passive: false });
      container.addEventListener('touchmove', preventZoom, { passive: false });
      container.addEventListener('wheel', preventWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', preventZoom);
        container.removeEventListener('touchmove', preventZoom);
        container.removeEventListener('wheel', preventWheel);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="rounded-r-2xl overflow-hidden h-full flex flex-col"
      style={{ touchAction: 'pan-y' }}
    >
      <div className="sticky top-0 p-2 flex justify-between items-end border-b-1 border-gray-300">
        <div className="px-4 py-1">
          <span className="font-medium text-lg xl:text-2xl text-gray-700">
            Search result:{" "}
          </span>
          <span className="text-xl xl:text-2xl font-semibold text-emerald-700">
            {stations.length}
          </span>
          <span className="text-base xl:text-lg font-normal text-gray-700"> stations found</span>
        </div>
        <div className="block lg:hidden shadow-2xl">
          <IconActionButton icon={LuX} action={closeList} iconSize="lg" />
        </div>
      </div>
      <ul className="overflow-auto pb-4 px-2 w-full flex-grow">
        {stations.map((station) => {
          const { Title, AddressLine1, Town } = station.AddressInfo;

          return (
            <div
              key={station.ID}
              className="border-1 border-gray-300 m-2 rounded-lg overflow-hidden"
            >
              <div
                className={`px-4 py-2 space-y-1 border-l-6 bg-gray-100 ${getStationStatusColor(
                  getStationStatus(station)
                )}`}
              >
                <div className="flex justify-between">
                  <span className="text-base font-medium">
                    {Title}
                    {station.StatusTypeID !== 50 && (
                      <span className="ml-2 font-semibold text-xs">
                        ({getStatusTypeData(station.StatusTypeID)?.Title})
                      </span>
                    )}
                  </span>

                  {station.OperatorID !== 1 && (
                    <a
                      href={
                        getOperatorData(station.OperatorID)?.WebsiteURL ||
                        undefined
                      }
                      target="_blank"
                      className="text-emerald-800 text-sm hover:underline text-end"
                    >
                      {
                        getOperatorData(station.OperatorID)
                          ?.Title?.split("|")[0]
                          .split("-")[0]
                      }
                    </a>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-0.5 xl:gap-2 flex-nowrap items-start flex-2">
                    <LuMapPin className="text-emerald-800 text-lg" />
                    <h4 className="text-sm">
                      {AddressLine1}
                      {Town && <span>{` - ${Town}`}</span>}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end text-end flex-1">
                    {station.UsageCost?.length > 0 && (
                      <span className="text-sm capitalize">
                        {station.UsageCost.split(" ")[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-4 px-4 py-2 transition-all duration-300 overflow-hidden ${
                  !expanded ? "max-h-42" : "max-h-full"
                } border-t-1 border-gray-300`}
              >
                {station.Connections.map((connection) => (
                  <ConnectionChargerCard
                    key={connection.ID}
                    connection={connection}
                  />
                ))}
              </div>
              {/* "Show more" button */}
              {station.Connections.length > 3 && (
                <div className="px-4 pb-4">
                  <button
                    className="cursor-pointer text-sm text-emerald-800 hover:underline focus:outline-none"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "Show less" : "Show more"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ChargerStationList;