export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  roles: string[];
  locale: string;
  access_token: string;
  refresh_token: string;
}

export interface Continent {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
  languages: string;
}

export interface Language {
  code: string;
  name: string;
  native: string;
  rtl: boolean;
}

export interface SearchResult {
  continents?: Continent[];
  countries?: Country[];
  languages?: Language[];
}
export interface ApiError {
  error: string;
  message: string;
}
export interface RefreshTokenResult {
  access_token: string;
  refresh_token: string;
}
