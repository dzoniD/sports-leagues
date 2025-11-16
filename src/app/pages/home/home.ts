import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FilterStore } from '../../store/filterStore.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HomeService } from './home.service';
import { League } from './model';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Card, Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private homeService = inject(HomeService);
  private destroyRef = inject(DestroyRef);
  private store = inject(FilterStore);

  badgeToDisplay = signal<any>(null);
  loading = signal(false);
  showOverlay = signal(false);
  allLeagues = signal<League[]>([]);
  leagues = computed(() => {
    let filtered = this.allLeagues();

    // Filter by search query (name)
    if (this.store.searchTerm().trim() !== '') {
      filtered = filtered.filter((league) =>
        league.strLeague.toLowerCase().includes(this.store.searchTerm().toLowerCase())
      );
      console.log('filtered', filtered);
    }

    // Filter by sport
    if (this.store.sport() !== '') {
      filtered = filtered.filter((league) => league.strSport === this.store.sport());
    }

    return filtered;
  });

  ngOnInit(): void {
    this.homeService
      .getLeagues()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          let leagues = data.leagues || [];
          this.allLeagues.set(leagues);
        },
        error: (error) => console.error('Error:', error),
      });
  }

  onLeagueClick(league: any) {
    this.loading.set(true);
    this.badgeToDisplay.set(null);
    this.homeService
      .getBadge(league.idLeague)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          let badgeUrl = ['4337', '4334'].includes(league.idLeague)
            ? data['seasons'][data.seasons.length - 3]
            : data['seasons'][data.seasons.length - 1];
          this.badgeToDisplay.set(badgeUrl || null);
          this.showOverlay.set(true);
          this.loading.set(false);
        },
        error: (error) => {
          this.loading.set(false);
        },
      });
  }

  closeOverlay() {
    this.showOverlay.set(false);
    this.badgeToDisplay.set(null);
  }
}
