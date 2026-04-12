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
  auth: any;

  constructor(private chargerService: ChargerService, private authService: AuthService, private router: Router) {

    this.auth = authService
  }

  async ngOnInit() {

    this.chargers = this.chargerService.getChargers();

    const position = await new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    this.userLat = position.coords.latitude;
    this.userLng = position.coords.longitude;

    this.processData();
  }

  processData() {
    this.chargers = this.chargerService.getChargers();
    this.filteredChargers = this.chargers;

  }

  toggleAdd() {
    this.showAddForm = !this.showAddForm;
  }

  getDistance(c: Charger): number {
    const R = 6371;

    const dLat = (c.lat - this.userLat) * Math.PI / 180;
    const dLng = (c.lng - this.userLng) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.userLat * Math.PI / 180) *
      Math.cos(c.lat * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
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
    this.auth.logout();
    this.router.navigate(['/login']); // ✅ redirect after logout
  }
}