export function zoomToDistance(zoom: number): number {
  if (zoom >= 15) return 2;
  if (zoom >= 13) return 5;
  if (zoom >= 11) return 10;
  if (zoom >= 9) return 20;
  if (zoom >= 7) return 30;
  return 50;
}
