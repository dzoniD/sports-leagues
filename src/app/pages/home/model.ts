export interface Leagues {
  leagues: League[];
}
export interface Badge {
  seasons: {
    strSeason: string;
    strBadge: string;
  }[];
}
export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}
