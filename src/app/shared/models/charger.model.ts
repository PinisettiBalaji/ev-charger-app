export interface Charger {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: 'Fast' | 'Slow';
  available: boolean;
  address: string;
}