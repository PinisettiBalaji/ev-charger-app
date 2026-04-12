import { Injectable } from '@angular/core';
import { Charger } from '../../shared/models/charger.model';

@Injectable({
  providedIn: 'root'
})
export class ChargerService {

  chargers: Charger[] = [
    {
      id: 1,
      name: 'Kukatpally EV Hub',
      lat: 17.4948,
      lng: 78.3996,
      type: 'Fast',
      available: true,
      address: 'Kukatpally, Hyderabad'
    },
    {
      id: 2,
      name: 'Hitech City Charging Point',
      lat: 17.4435,
      lng: 78.3772,
      type: 'Fast',
      available: true,
      address: 'Hitech City, Hyderabad'
    },
    {
      id: 3,
      name: 'Miyapur EV Station',
      lat: 17.4965,
      lng: 78.3562,
      type: 'Slow',
      available: false,
      address: 'Miyapur, Hyderabad'
    },
    {
      id: 4,
      name: 'JNTU Charging Zone',
      lat: 17.4933,
      lng: 78.3915,
      type: 'Fast',
      available: true,
      address: 'JNTU, Hyderabad'
    },
    {
      id: 5,
      name: 'KPHB Phase 5 Station',
      lat: 17.4849,
      lng: 78.4070,
      type: 'Slow',
      available: true,
      address: 'KPHB Phase 5, Hyderabad'
    },
    {
      id: 6,
      name: 'Madhapur EV Point',
      lat: 17.4483,
      lng: 78.3915,
      type: 'Fast',
      available: false,
      address: 'Madhapur, Hyderabad'
    },
    {
      id: 7,
      name: 'Gachibowli Charging Hub',
      lat: 17.4401,
      lng: 78.3489,
      type: 'Fast',
      available: true,
      address: 'Gachibowli, Hyderabad'
    },
    {
      id: 8,
      name: 'Nizampet EV Station',
      lat: 17.5169,
      lng: 78.3806,
      type: 'Slow',
      available: true,
      address: 'Nizampet, Hyderabad'
    },
    {
      id: 9,
      name: 'Pragathi Nagar Charger',
      lat: 17.5175,
      lng: 78.3910,
      type: 'Fast',
      available: false,
      address: 'Pragathi Nagar, Hyderabad'
    },
    {
      id: 10,
      name: 'Bachupally EV Station',
      lat: 17.5373,
      lng: 78.3840,
      type: 'Slow',
      available: true,
      address: 'Bachupally, Hyderabad'
    }
  ];


  getChargers() {
    return this.chargers;
  }

  addCharger(charger: Charger) {
    this.chargers.push(charger);
  }
}