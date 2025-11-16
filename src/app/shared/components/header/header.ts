import { Component, inject } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { Dropdown } from '../dropdown/dropdown';
import { FilterStore } from '../../../store/filterStore.store';

@Component({
  selector: 'app-header',
  imports: [SearchBar, Dropdown],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(FilterStore);
  dropdownValues = [
    'Soccer',
    'Basketball',
    'American Football',
    'Ice Hockey',
    'Baseball',
    'Tennis',
  ];

  clearFilters() {
    this.store.clear();
  }
}
