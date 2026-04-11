import { Injectable } from '@angular/core';
import { Charger } from '../../shared/models/charger.model';

@Injectable({
  providedIn: 'root',
})
export class ChargerService {

   getChargers(): Charger[] {
    return [
      {
        id: 1,
        name: 'EV Station Kukatpally',
        lat: 17.4948,
        lng: 78.3996,
        type: 'Fast',
        available: true,
        address: 'Kukatpally, Hyderabad'
      },
      {
        id: 2,
        name: 'EV Station Hitech City',
        lat: 17.4435,
        lng: 78.3772,
        type: 'Slow',
        available: false,
        address: 'Hitech City, Hyderabad'
      }
    ];
  }
}
