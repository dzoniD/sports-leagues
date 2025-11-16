import { inject, Injectable } from '@angular/core';

import { catchError, Observable, shareReplay, throwError } from 'rxjs';
import { Badge, Leagues } from './model';
import { Requests } from '../../services/requests.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private request = inject(Requests);
  private leaguesCache$: Observable<Leagues> | null = null;
  private badgeCache = new Map<number, Observable<Badge>>();

  getLeagues(): Observable<Leagues> {
    if (!this.leaguesCache$) {
      this.leaguesCache$ = this.request.get<Leagues>('api/v1/json/3/all_leagues.php').pipe(
        catchError((error) => {
          console.error('Error fetching leagues:', error);
          this.leaguesCache$ = null;
          return throwError(() => new Error('Failed to fetch leagues'));
        }),
        shareReplay(1)
      );
    }
    return this.leaguesCache$;
  }

  getBadge(leagueId: number): Observable<Badge> {
    if (!this.badgeCache.has(leagueId)) {
      const badge$ = this.request
        .get('/api/v1/json/3/search_all_seasons.php', { badge: 1, id: leagueId })
        .pipe(
          catchError((error) => {
            console.error('Error fetching badge:', error);
            this.badgeCache.delete(leagueId);
            return throwError(() => new Error('Failed to fetch badge'));
          }),
          shareReplay(1)
        );
      this.badgeCache.set(leagueId, badge$ as Observable<Badge>);
    }
    return this.badgeCache.get(leagueId)!;
  }
}
