import chargersData from '../data/chargersdata.json';
import { EnumStationStatus, type ChargingStation, type Coordinates, type MapBounds, type StationsSearchFilters } from "../types/types";
import { type Option } from '../types/types';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?format=json';
const OPENCHARGEMAP_BASE_URL = `https://api.openchargemap.io/v3/poi/?output=json&maxresults=500&key=${import.meta.env.VITE_OPENCHARGEMAP_API_KEY}`;
const DEFAULT_DISTANCE = 2.5;

export const fetchCoordinatesByQuery = async (query: string): Promise<{ lat: string, lon: string }[]> => {
  const url = `${NOMINATIM_BASE_URL}&q=${encodeURIComponent(query)}`
  const response = await fetch(url);
  return response.json();
}

export const fetchStationsByCoords = async (coords: Coordinates, filters?: StationsSearchFilters): Promise<ChargingStation[]> => {
  let url = `${OPENCHARGEMAP_BASE_URL}&latitude=${coords.lat}&longitude=${coords.lng}&distance=${DEFAULT_DISTANCE}&distanceunit=KM`;
  url += mapUrlFilters(filters);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al consultar OpenChargeMap');
  const data = await response.json();
  return data;
};

export const fetchStationsInBounds = async (bounds: MapBounds, filters?: StationsSearchFilters) => {
  let url = `${OPENCHARGEMAP_BASE_URL}&boundingbox=(${bounds.minLat},${bounds.minLng}),(${bounds.maxLat},${bounds.maxLng})`;
  url += mapUrlFilters(filters);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al consultar OpenChargeMap');
  return response.json();
};

export const getOperatorData = (operatorID: number) => {
  return chargersData.Operators.find(operator => operator.ID === operatorID);
}

export const getUsageType = (usageTypeID: number) => {
  return chargersData.UsageTypes.find(usage => usage.ID === usageTypeID);
}

export const getConnectionTypeData = (connectionTypeID?: number) => {
  if (!connectionTypeID) return;
  return chargersData.ConnectionTypes.find(connectionType => connectionType.ID === connectionTypeID);
}

export const getStatusTypeData = (statusTypeID?: number) => {
  if (!statusTypeID) return;
  return chargersData.StatusTypes.find(stateType => stateType.ID === statusTypeID);
}

const mapUrlFilters = (filters?: StationsSearchFilters): string => {
  if (!filters) return '';
  let urlFilters = '';
  if (filters.usage) {
    urlFilters += `&usageTypeId=${filters.usage}`;
  }
  if (filters.kwRange.min > 0) {
    urlFilters += `&minpowerkw=${filters.kwRange.min}`;
  }
  if (filters.kwRange.max < 350) {
    urlFilters += `&maxpowerkw=${filters.kwRange.max}`;
  }
  return urlFilters;
}

/**
 * Calcula la distancia en kilómetros entre dos puntos geográficos usando la fórmula del haversine.
 * @param lat1 Latitud del primer punto
 * @param lon1 Longitud del primer punto
 * @param lat2 Latitud del segundo punto
 * @param lon2 Longitud del segundo punto
 * @returns Distancia en kilómetros
 */
export const getDistanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const toRad = (deg: number): number => {
  return (deg * Math.PI) / 180;
}

export const getStationStatus = (station: ChargingStation) => {
  const statusStatus: EnumStationStatus =
    station.Connections.every(connection => connection.StatusTypeID === 10 || connection.StatusTypeID === 50) ? EnumStationStatus.Available
      : station.Connections.every(connection => connection.StatusTypeID !== 10 && connection.StatusTypeID !== 50) ? EnumStationStatus.Inoperative
        : EnumStationStatus.PartiallyAvailable;

  return statusStatus;
}

export const getUsageTypeDropdownOptions = (): Option[] => {
  const usageTypes = chargersData.UsageTypes;
  return usageTypes.map(usageType => ({
    label: usageType.Title,
    value: usageType.ID.toString()
  }));
}