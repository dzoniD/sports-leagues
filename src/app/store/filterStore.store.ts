import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export interface FilterState {
  searchTerm: string;
  sport: string;
}

function debounceFn<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timer: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export const FilterStore = signalStore(
  { providedIn: 'root' },
  withState<FilterState>({
    searchTerm: '',
    sport: '',
  }),
  withMethods((store) => ({
    setSearchTerm: debounceFn((value: string) => {
      patchState(store, (state) => ({ ...state, searchTerm: value }));
    }, 300),
    selectSport(value: string) {
      patchState(store, (state) => ({ ...state, sport: value }));
    },
    clear() {
      patchState(store, (state) => ({ ...state, searchTerm: '', sport: '' }));
    },
  }))
);
