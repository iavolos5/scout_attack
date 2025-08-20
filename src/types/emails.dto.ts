export interface SearchLoc {
  loc_name: string;
}

export interface Leak {
  leak_name: string;
}

export interface EmailItem {
  email: string;
  compromised_flg: boolean;
  is_latest_only: boolean;
  search_locs: SearchLoc[];
  leaks: Leak[];
}
