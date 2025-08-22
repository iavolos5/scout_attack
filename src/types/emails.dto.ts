export interface SearchDate {
  date_from: string;
  date_to: string;
}

export interface SearchLoc {
  loc_name: string;
  dates: SearchDate[];
}

export interface Leak {
  leak_name: string;
  leak_date: string;
}

export interface EmailItem {
  email: string;
  compromised_flg: boolean;
  is_latest_only: boolean;
  earliest_date: string;
  search_locs: SearchLoc[];
  leaks: Leak[];
}
