import { Component, OnInit } from '@angular/core';
import { ChargerService } from '../core/services/charger.service';
import { Charger } from '../shared/models/charger.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chargers: Charger[] = [];
  filteredChargers: Charger[] = [];

  isSidebarCollapsed = false;

  constructor(private chargerService: ChargerService) { }

  ngOnInit(): void {
    this.chargers = this.chargerService.getChargers();
    this.filteredChargers = this.chargers;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  applyQuickFilter(type: string) {

    if (type === 'available') {
      this.filteredChargers = this.chargers.filter(c => c.available);
    }

    if (type === 'fast') {
      this.filteredChargers = this.chargers.filter(c => c.type === 'Fast');
    }

    if (type === 'cheap') {
      this.filteredChargers = this.chargers.slice(0, 1);
    }

    if (type === 'nearest') {
      this.filteredChargers = [...this.chargers].sort((a, b) => a.lat - b.lat);
    }
  }

  onSelect(charger: Charger) {
    console.log('Selected:', charger);
  }
}