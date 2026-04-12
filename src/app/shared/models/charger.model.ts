export interface Charger {
  id: number;

  name: string;
  address: string;
  location: string;

  lat: number;
  lng: number;

  type: 'Fast' | 'Slow' | 'Super';

  connectors: ('Type 2' | 'CCS' | 'CHAdeMO')[];
  ports: number;
  numberOfChargers: number;

  // 🔥 NEW FIELD
  powerType: 'AC' | 'DC';
  powerOutput: number; // in kW (e.g., 30, 60, 120)

  available: boolean;
  status: 'Available' | 'Busy' | 'Out of Service' | 'Maintenance';

  pricePerUnit: number;

  openTime: string;
  closeTime: string;

  contact: string;

  distance?: number;
}