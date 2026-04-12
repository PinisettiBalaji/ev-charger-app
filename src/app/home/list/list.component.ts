import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Charger } from '../../shared/models/charger.model';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() chargers: Charger[] = [];
  @Output() selectCharger = new EventEmitter<Charger>();


  @Input() userLat!: number;
  @Input() userLng!: number;
}
