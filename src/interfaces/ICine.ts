export interface IFormCinema extends ICinemaBase {
  longitude: number;
  latitude: number;
}

export interface ICinemaBase {
  id: number;
  name: string;
}
