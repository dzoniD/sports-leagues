import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterStore } from '../../../store/filterStore.store';

@Component({
  selector: 'app-dropdown',
  imports: [FormsModule, CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  private store = inject(FilterStore);
  values = input<string[]>([]);

  get selectedValue(): string {
    return this.store.sport();
  }

  set selectedValue(value: string) {
    this.store.selectSport(value);
  }
}
