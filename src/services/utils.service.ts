export const getStationStatusColor = (statusTypeID: number | undefined) => {
  if (!statusTypeID) return 'bg-rose-500';

  switch (statusTypeID) {
    case 10:
    case 50:
      return 'bg-emerald-50/60';

    case 150:
      return 'bg-gray-50';

    default:
      return 'bg-rose-50/60';
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