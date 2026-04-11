import { Component, Input } from '@angular/core';
import { Charger } from '../../shared/models/charger.model';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
   @Input() charger!: Charger;

  openDirections() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${this.charger.lat},${this.charger.lng}`;
    window.open(url, '_blank');
  }
}
