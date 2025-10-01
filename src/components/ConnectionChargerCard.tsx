import { FaBolt } from "react-icons/fa6";
import { getConnectionTypeData, getStatusTypeData } from "../services/open-charge-map.service";
import { getConnectionStatusColor } from "../services/utils.service";
import type { ChargingStationConnection } from "../types/types";

interface ConnectionChargerCardProps {
  connection: ChargingStationConnection;
}

const ConnectionChargerCard: React.FC<ConnectionChargerCardProps> = ({ connection }) => {
  return (
    <div className='relative flex flex-col gap-2 flex-nowrap items-center justify-center text-center aspect-square border-1 border-gray-300 shadow-sm rounded-xl px-1 h-full'>
      <div className={`absolute w-4 h-4 top-2 right-2 rounded-full ${getConnectionStatusColor(connection.StatusTypeID)}`} title={getStatusTypeData(connection.StatusTypeID)?.Title} />
      <img
        src={`connector_types/${connection.ConnectionTypeID}.svg`}
        alt=""
        width={40}
        height={40}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = 'connector_types/unkown.svg';
        }} />
      <span className='text-sm line-clamp-1'>{getConnectionTypeData(connection.ConnectionTypeID)?.Title}</span>
      <div className='flex gap-2 items-center'>
        <FaBolt className='text-emerald-800 text-sm' />
        <span className='text-gray-400 text-sm'>{connection.PowerKW}KW</span>
      </div>
    </div>
  )
}

export default ConnectionChargerCard;