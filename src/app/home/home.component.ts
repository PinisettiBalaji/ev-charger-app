import { Component, OnInit } from '@angular/core';
import { ChargerService } from '../core/services/charger.service';
import { Charger } from '../shared/models/charger.model';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {

  chargers: Charger[] = [];

  nearby5km: Charger[] = [];
  nearby10km: Charger[] = [];

  availableCount = 0;

  userLat!: number;
  userLng!: number;
  filteredChargers: Charger[] = [];
  isSidebarCollapsed = false;
  showAddForm = false;

  constructor(private chargerService: ChargerService, public authService: AuthService, private router: Router) { }

  async ngOnInit() {
    try {
      // ✅ 1. Load chargers FIRST (always)
      this.chargers = await this.chargerService.getChargers();

      // ✅ 2. Get user location (safe)
      const position = await this.getUserLocation();

      if (position) {
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;
      }

      // ✅ 3. Process data (distance / sorting etc.)
      this.processData();

    } catch (error) {
      console.error('Error in ngOnInit:', error);

      // fallback → still show chargers
      this.processData();
    }
  }

  getUserLocation(): Promise<GeolocationPosition | null> {
    return new Promise((resolve) => {

      if (!navigator.geolocation) {
        console.warn('Geolocation not supported');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          console.warn('Location denied or error:', error);
          resolve(null); // ✅ prevent crash
        }
      );

    });
  }

  processData() {
    this.chargers = this.chargerService.getChargers();


    
    this.filteredChargers = this.chargers;


  }

  toggleAdd() {
    this.showAddForm = !this.showAddForm;
  }

  getDistance(lat: number, lng: number): number {
    const R = 6371; // Earth radius in km

    const dLat = this.toRad(lat - this.userLat);
    const dLng = this.toRad(lng - this.userLng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(this.userLat)) *
      Math.cos(this.toRad(lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  toRad(value: number) {
    return value * Math.PI / 180;
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  refreshList() {
    this.processData();
    this.showAddForm = false;
  }

  applyQuickFilter(type: string) {
    // if (type === 'available') {
    //   this.nearby5km = this.nearby5km.filter(c => c.available);
    //   this.nearby10km = this.nearby10km.filter(c => c.available);
    // }

    if (type === 'available') {
      this.filteredChargers = this.chargers.filter(c => c.available);
    }

    else if (type === 'fast') {
      this.filteredChargers = this.chargers.filter(c => c.type === 'Fast');
    }

    else if (type === 'cheap') {
      this.filteredChargers = this.chargers.slice(0, 5);
    }

    else if (type === 'nearest') {
      this.filteredChargers = [...this.chargers];
    }

    else {
      this.filteredChargers = this.chargers;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // ✅ redirect after logout
  }
}