import React, { useState } from 'react';
import { getOperatorData, getStatusTypeData } from '../services/open-charge-map.service';
import { LuMapPin } from 'react-icons/lu';
import type { ChargingStation } from '../types/types';
import { getStationStatusColor } from '../services/utils.service';
import ConnectionChargerCard from './ConnectionChargerCard';

interface ChargerStationListProps {
  stations: ChargingStation[],
}

const ChargerStationList: React.FC<ChargerStationListProps> = ({ stations }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ul className='pl-2 mt-20 overflow-auto pb-4 z-10'>
      {
        stations.map((station) => {
          const {
            Title,
            AddressLine1,
            Town,
          } = station.AddressInfo;

          return (
            <div
              key={station.ID}
              className='border-1 border-gray-300 m-2 space-y-2 rounded-lg overflow-hidden'
            >
              <div className={`${getStationStatusColor(station.StatusTypeID)} px-4 py-2 border-b-1 border-gray-300 space-y-1`}>
                <div className='flex justify-between'>
                  <span className='text-base font-medium'>
                    {Title}
                    {station.StatusTypeID !== 50 &&
                      <span className='ml-2 font-semibold text-xs'>({getStatusTypeData(station.StatusTypeID)?.Title})</span>
                    }
                  </span>

                  {
                    station.OperatorID !== 1 &&
                    <a
                      href={getOperatorData(station.OperatorID)?.WebsiteURL || undefined}
                      target='_blank'
                      className='text-emerald-800 text-sm hover:underline text-end'>
                      {getOperatorData(station.OperatorID)?.Title}
                    </a>
                  }
                </div>
                <div className='flex gap-2 flex-nowrap items-center'>
                  <LuMapPin className='text-emerald-800 text-lg' />
                  <h4 className='text-sm'>
                    {AddressLine1}
                    {Town &&
                      <span>
                        {` - ${Town}`}
                      </span>
                    }
                  </h4>
                </div>
              </div>
              <div className={`grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-4 px-4 pb-2 transition-all duration-300 overflow-hidden ${!expanded ? 'max-h-42' : 'max-h-full'}`}>
                {
                  station.Connections.map((connection) => (
                    <ConnectionChargerCard connection={connection} />
                  ))
                }
              </div>
              {/* "Show more" button */}
              {
                station.Connections.length > 3 && (
                  <div className='px-4 pb-4'>
                    <button
                      className='cursor-pointer text-sm text-emerald-800 hover:underline focus:outline-none'
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? 'Show less' : 'Show more'}
                    </button>
                  </div>
                )
              }
            </div>
          );
        })
      }
    </ul>
  );
};

export default ChargerStationList;