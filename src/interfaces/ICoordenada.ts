export interface ICoordenada {
  latitude: number;
  longitude: number;
}

export interface ILocation extends ICoordenada {
  cinemaName?: string;
}
