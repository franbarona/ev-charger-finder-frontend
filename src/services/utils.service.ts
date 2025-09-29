import { EnumStationStatus } from "../types/types";

export const getStationStatusColor = (statusTypeID: EnumStationStatus) => {

  switch (statusTypeID) {
    case EnumStationStatus.Inoperative:
      return 'border-red-700';

    case EnumStationStatus.PartiallyAvailable:
      return 'border-yellow-700';

    case EnumStationStatus.Available:
    default:
      return 'border-emerald-800';
  }
}

export const getConnectionStatusColor = (statusTypeID: number | undefined) => {
  if (!statusTypeID) return 'bg-rose-500';

  switch (statusTypeID) {
    case 10:
    case 50:
      return 'bg-emerald-500';

    case 75:
      return 'bg-amber-300';

    default:
      return 'bg-rose-500';
  }
}