import { IActorPelicula, ICharacter } from './IActor';
import { ICinemaBase, IFormCinema } from './ICine';
import { IGenero } from './IGenero';

export interface IPeliculaBase {
  title: string;
  releaseDate: Date;
  trailerUrl: string;
  mpaaRating: string;
  genres: number[];
  cast: ICharacter[];
  cinemas: number[];
}

export interface IPeliculaDetails {
  id: number;
  title: string;
  releaseDate: Date;
  trailerUrl: string;
  posterUrl: string;
  mpaaRating: string;
  genres: IGenero[];
  cinemas: IFormCinema[];
  cast: IActorPelicula[];
}

export interface IPelicula extends IPeliculaBase {
  posterUrl: string;
  id?: number;
}

export interface IFormularioPelicula extends IPeliculaBase {
  posterFile: File;
}

export interface IMovieResources {
  cinemas: ICinemaBase[];
  genres: IGenero[];
}

export interface IMovieLandigPage {
  onCinemas: IPelicula[];
  comingSoon: IPelicula[];
}

export interface IMovieForEditing {
  movie: IPelicula;
  genres: IGenero[];
  noSelectedGenres: IGenero[];
  cinemas: IFormCinema[];
  noSelectedCinemas: IFormCinema[];
  cast: IActorPelicula[]
}
