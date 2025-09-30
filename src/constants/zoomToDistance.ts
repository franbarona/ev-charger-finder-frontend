export function zoomToDistance(zoom: number): number {
  if (zoom >= 15) return 5; // max 6
  if (zoom >= 14) return 10; // max 12
  if (zoom >= 13) return 20; // max 24
  if (zoom >= 12) return 45; // max 48
  if (zoom >= 11) return 90; // max 96
  if (zoom >= 10) return 190; // max 193
  if (zoom >= 9) return 360; // max 387
  if (zoom >= 8) return 750; // max 774
  if (zoom >= 7) return 1500; // max 1,552
  if (zoom >= 6) return 2900; // max 3060
  return 50;
}
