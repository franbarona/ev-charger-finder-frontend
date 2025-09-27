import chargersData from '../data/chargersdata.json';
import type { ChargingStation } from "../types/types";

export const fetchChargingStations = async (
  lat: number,
  lng: number,
  distance = 10
): Promise<ChargingStation[]> => {
  const response = await fetch(
    `https://api.openchargemap.io/v3/poi/?output=json&latitude=${lat}&longitude=${lng}&distance=${distance}&distanceunit=KM&maxresults=20&compact=true&verbose=false&key=${import.meta.env.VITE_OPENCHARGEMAP_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Error al consultar OpenChargeMap');
  }

  const data = await response.json();
  return data;
};

export const searchWithCoordinates = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://api.openchargemap.io/v3/poi/?output=json&latitude=${lat}&longitude=${lng}&distance=10&distanceunit=KM&maxresults=20&key=${import.meta.env.VITE_OPENCHARGEMAP_API_KEY}`
  );
  return response.json();
};

export const getOperatorData = (operatorID: number) => {
  return chargersData.Operators.find(operator => operator.ID === operatorID);
}

export const getConnectionTypeData = (connectionTypeID?: number) => {
  if (!connectionTypeID) return;
  return chargersData.ConnectionTypes.find(connectionType => connectionType.ID === connectionTypeID);
}

export const getStatusTypeData = (statusTypeID?: number) => {
  if (!statusTypeID) return;
  return chargersData.StatusTypes.find(stateType => stateType.ID === statusTypeID);
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

