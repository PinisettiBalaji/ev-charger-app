import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: false,   
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() filterChange = new EventEmitter<any>();

  searchText = '';
  type = '';
  availableOnly = false;

  applyFilter() {
    this.filterChange.emit({
      search: this.searchText,
      type: this.type,
      available: this.availableOnly
    });
  }
}