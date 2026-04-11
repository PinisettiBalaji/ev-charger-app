import { Component } from '@angular/core';
import { Charger } from '../shared/models/charger.model';
import { ChargerService } from '../core/services/charger.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  chargers: Charger[] = [];
  selectedCharger!: Charger;

  constructor(private chargerService: ChargerService) { }

  ngOnInit(): void {
    this.chargers = this.chargerService.getChargers();
  }

  onSelect(charger: Charger) {
    this.selectedCharger = charger;
  }
}
