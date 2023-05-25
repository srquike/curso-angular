import { ICharacter } from "./IActor";
import { ICinemaBase } from "./ICine";
import { IGenero } from "./IGenero";

interface IPeliculaBase {
  title: string;
  releaseDate: Date;
  trailerUrl: string;
  mpaaRating: string;
  genres: number[];
  cast: ICharacter[];
  cinemas: number[];
}

export interface IPelicula extends IPeliculaBase {
  poster: string;
}

export interface IFormularioPelicula extends IPeliculaBase{
  posterFile: File;
}

export interface IMovieResources {
  cinemas: ICinemaBase[],
  genres: IGenero[]
}