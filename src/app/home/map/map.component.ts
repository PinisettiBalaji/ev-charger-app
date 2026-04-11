import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { Charger } from '../../shared/models/charger.model';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  @Input() chargers: Charger[] = [];
  @Output() selectCharger = new EventEmitter<Charger>();

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map').setView([17.4948, 78.3996], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.chargers.forEach(charger => {
      const marker = L.marker([charger.lat, charger.lng]).addTo(this.map);

      marker.on('click', () => {
        this.selectCharger.emit(charger);
      });
    });
  }
}
