import { Component, inject } from '@angular/core';
import { FilterStore } from '../../../store/filterStore.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  private store = inject(FilterStore);

  get searchQuery() {
    return this.store.searchTerm();
  }

  set searchQuery(value: string) {
    this.store.setSearchTerm(value);
  }
}
