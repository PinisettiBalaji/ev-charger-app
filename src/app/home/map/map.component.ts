import {
  Component, Input, Output, EventEmitter,
  AfterViewInit, OnChanges, SimpleChanges
} from '@angular/core';
import * as L from 'leaflet';
import { Charger } from '../../shared/models/charger.model';
import { LocationService } from '../../core/services/location.service';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {

  @Input() chargers: Charger[] = [];
  @Output() selectCharger = new EventEmitter<Charger>();

  private map!: L.Map;
  private markers: L.Marker[] = [];
  private userMarker!: L.Marker;

  constructor(private locationService: LocationService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadUserLocation();

    window.addEventListener('resize', () => {
      this.map.invalidateSize();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && changes['chargers']) {
      this.renderMarkers();
    }
  }

  private initMap() {
    this.map = L.map('map').setView([17.4948, 78.3996], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);
  }

  private async loadUserLocation() {
    try {
      const loc = await this.locationService.getCurrentLocation();

      this.map.setView([loc.lat, loc.lng], 14);

      this.userMarker = L.marker([loc.lat, loc.lng], {
        title: 'You are here'
      }).addTo(this.map);

    } catch (e) {
      console.error('Location error', e);
    }
  }

  private renderMarkers() {
    this.markers.forEach(m => m.remove());
    this.markers = [];

    this.chargers.forEach(charger => {
      const marker = L.marker([charger.lat, charger.lng]).addTo(this.map);

      marker.on('click', () => {
        this.selectCharger.emit(charger);
      });

      this.markers.push(marker);
    });
  }
}