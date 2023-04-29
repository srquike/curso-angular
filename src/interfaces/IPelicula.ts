export interface IPelicula {
  nombre: string;
  fechaEstreno: Date;
  recaudacion: number;
  poster: string;
  esEnCines: boolean;
  esProximoEstreno: boolean;
  generos: number[];
}

export interface ICrearPelicula {
  
}