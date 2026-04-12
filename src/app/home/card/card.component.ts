import { Component, Input } from '@angular/core';
import { Charger } from '../../shared/models/charger.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent {

  @Input() charger!: Charger;
  @Input() userLat!: number;
  @Input() userLng!: number;

  get distance(): number {
    const R = 6371;

    const dLat = (this.charger.lat - this.userLat) * Math.PI / 180;
    const dLng = (this.charger.lng - this.userLng) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.userLat * Math.PI / 180) *
      Math.cos(this.charger.lat * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;

    return +(R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))).toFixed(1);
  }



  getDirections() {

    if (!this.charger.lat || !this.charger.lng) {
      alert('Location not available for this charger');
      return;
    }

    // 🔥 Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {

        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        const destination = `${this.charger.lat},${this.charger.lng}`;

        // Google Maps navigation
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

        window.open(url, '_blank');
      },
      (error) => {
        console.warn('Location error:', error);

        // fallback → only destination
        const destination = `${this.charger.lat},${this.charger.lng}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

        window.open(url, '_blank');
      }
    );
  }
}