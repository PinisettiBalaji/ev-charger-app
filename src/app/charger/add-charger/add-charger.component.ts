import { Component, EventEmitter, Output } from '@angular/core';
import { ChargerService } from '../../core/services/charger.service';

@Component({
  selector: 'app-add-charger',
  templateUrl: './add-charger.component.html',
  styleUrls: ['./add-charger.component.scss'],
  standalone: false
})
export class AddChargerComponent {

  @Output() added = new EventEmitter<void>();
  charger: any = {
    name: '',
    type: 'Fast',
    available: true
  };

  constructor(private chargerService: ChargerService) { }

  async addCharger() {

    const position = await new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const newCharger = {
      id: Date.now(),
      name: this.charger.name,
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      type: this.charger.type,
      available: this.charger.available,
      address: 'User Added'
    };

    this.chargerService.addCharger(newCharger);

    alert('Charger Added!');
    this.added.emit();
  }
}