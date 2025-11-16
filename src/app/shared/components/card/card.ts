import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  league = input<{ strLeague: string; strSport: string; strLeagueAlternate?: string } | null>(null);
}
