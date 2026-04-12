import { Component } from '@angular/core';
import { ChargerService } from '../../core/services/charger.service';

@Component({
  selector: 'app-add-charger',
  templateUrl: './add-charger.component.html',
  styleUrls: ['./add-charger.component.scss'],
  standalone: false
})
export class AddChargerComponent {

  constructor(private chargerService: ChargerService) { }

  charger: any = this.getEmptyCharger();

  connectorOptions = ['Type2', 'CCS', 'CHAdeMO'];

  submitted = false;

  // ✅ Empty model
  getEmptyCharger() {
    return {
      id: Date.now(),
      name: '',
      address: '',
      location: '',
      lat: '',
      lng: '',
      type: '',
      connectors: [],
      ports: '',
      numberOfChargers: '',
      powerType: '',
      powerOutput: '',
      pricePerUnit: '',
      openTime: '',
      closeTime: '',
      contact: '',
      status: 'Available',
      available: true
    };
  }

  // ✅ Handle connectors
  onConnectorChange(event: any, type: string) {
    if (event.target.checked) {
      this.charger.connectors.push(type);
    } else {
      this.charger.connectors =
        this.charger.connectors.filter((c: string) => c !== type);
    }
  }

  // ✅ Submit
  onSubmit() {
    this.submitted = true;

    if (
      !this.charger.name ||
      !this.charger.address ||
      this.charger.connectors.length === 0 ||
      !this.charger.powerType ||
      !this.charger.powerOutput
    ) {
      return;
    }

    // 🔥 Save to service
    this.chargerService.addCharger({ ...this.charger });

    // ✅ Success + confirm
    const addMore = confirm(
      '✅ Charger added successfully!\n\nDo you want to add another charger?'
    );

    if (addMore) {
      this.resetForm();
    } else {
      this.resetForm();
      // optionally navigate
      // this.router.navigate(['/home']);
    }
  }

  // ✅ Reset
  resetForm() {
    this.charger = this.getEmptyCharger();
    this.submitted = false;
  }

  // ✅ Get current location
  useCurrentLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.charger.lat = pos.coords.latitude;
      this.charger.lng = pos.coords.longitude;
    });
  }
}