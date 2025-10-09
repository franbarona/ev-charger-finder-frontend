import { LuX } from "react-icons/lu";
import IconActionButton from "./ui/IconActionButton";
import type { ChargingStation } from "../types/types";
import { getOperatorData } from "../services/open-charge-map.service";
import HorizontalScroll from "./HorizontalScroll";
import ConnectionChargerCard from "./ConnectionChargerCard";

interface StationPopupContentProps {
  station: ChargingStation;
  closeAction: () => void;
}

const StationPopupContent: React.FC<StationPopupContentProps> = ({ station, closeAction }) => {
  return (
    <div className="p-2">
      <div className='absolute right-2'>
        <IconActionButton icon={LuX} action={closeAction} iconSize='lg' />
      </div>
      <div className="text-lg px-4 pb-4 pt-3 space-y-1 w-full">
        <h1 className="font-semibold mr-4">{station.AddressInfo.Title}</h1>
        <div className='text-sm text-gray-600'>
          {
            station.AddressInfo.AddressLine1 && <span>{station.AddressInfo.AddressLine1}</span>
          }
          {
            station.AddressInfo.Town && <span>{`, ${station.AddressInfo.Town}`}</span>
          }
          {
            station.AddressInfo.StateOrProvince && <span>{`, ${station.AddressInfo.StateOrProvince}`}</span>
          }
          {
            station.AddressInfo.Postcode && <span>{` (${station.AddressInfo.Postcode})`}</span>
          }
        </div>
        {
          station.OperatorID !== 1 &&
          <div className='text-xs text-gray-600'>
            <a
              href={getOperatorData(station.OperatorID)?.WebsiteURL || undefined}
              target='_blank'
              className='text-emerald-800 text-sm hover:underline text-end'
              style={{ color: 'oklch(43.2% 0.095 166.913)' }}
            >
              {getOperatorData(station.OperatorID)?.Title}
            </a>
          </div>
        }
        <HorizontalScroll>
          <div className='scrollbar-hide flex gap-2 aspect-square max-h-[150px] w-[95%] mt-2'>
            {
              station.Connections.map((connection) => (
                <ConnectionChargerCard key={connection.ID} connection={connection} />
              ))
            }
          </div>
        </HorizontalScroll>
      </div>
    </div>
  )
}

export default StationPopupContent;